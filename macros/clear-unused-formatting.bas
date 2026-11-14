Attribute VB_Name = "ClearUnusedFormatting"
Option Explicit

' Sayfadaki mevcut filtreleri yedekler, tüm filtreleri temizler,
' gizli satır/sütunlar dahil gerçek son veriyi bulur, dışındaki biçimlendirmeyi temizler
' ve eski filtre ayarlarını birebir geri yükler.
Public Sub VeriDisiTemizleVeSifirla()
    Dim ws As Worksheet
    Dim lastRowCell As Range, lastColCell As Range, refreshedRange As Range
    Dim lastRow As Long, lastCol As Long
    Dim oldScreenUpdating As Boolean, oldEnableEvents As Boolean
    Dim oldCalculation As XlCalculation
    Dim settingsCaptured As Boolean, completed As Boolean
    Dim errorNumber As Long, errorDescription As String
    Dim answer As VbMsgBoxResult

    ' Filtre yedekleme değişkenleri
    Dim hasAutoFilter As Boolean
    Dim filterRangeAddress As String
    Dim filterCriteria() As Variant
    Dim i As Long
    Dim tbl As ListObject
    Dim tblNames() As String, tblFilterStates() As Boolean
    Dim tblCount As Long

    If TypeName(ActiveSheet) <> "Worksheet" Then
        MsgBox "Lütfen bir çalışma sayfası seçip tekrar deneyin.", vbExclamation, "Kullanılmayan Biçimleri Temizle"
        Exit Sub
    End If
    Set ws = ActiveSheet

    If ws.ProtectContents Then
        MsgBox "Bu sayfa korumalı. Makroyu çalıştırmadan önce sayfa korumasını kaldırın.", _
               vbExclamation, "Kullanılmayan Biçimleri Temizle"
        Exit Sub
    End If

    answer = MsgBox("'" & ws.Name & "' sayfasındaki veri alanı dışındaki tüm biçimlendirmeler temizlensin mi?" & vbCrLf & _
        "(Açık filtreler geçici olarak kaldırılacak ve işlem sonunda aynı şekilde geri yüklenecektir.)", _
        vbQuestion + vbYesNo + vbDefaultButton2, "Kullanılmayan Biçimleri Temizle")
    If answer <> vbYes Then Exit Sub

    oldScreenUpdating = Application.ScreenUpdating
    oldEnableEvents = Application.EnableEvents
    oldCalculation = Application.Calculation
    settingsCaptured = True

    On Error GoTo ErrorHandler
    Application.ScreenUpdating = False
    Application.EnableEvents = False
    Application.Calculation = xlCalculationManual

    ' 1. STANDART SAYFA FİLTRESİNİ YEDEKLE VE KALDIR
    If ws.AutoFilterMode Then
        hasAutoFilter = True
        filterRangeAddress = ws.AutoFilter.Range.Address
        ReDim filterCriteria(1 To ws.AutoFilter.Filters.Count, 1 To 3)
        
        For i = 1 To ws.AutoFilter.Filters.Count
            With ws.AutoFilter.Filters(i)
                If .On Then
                    filterCriteria(i, 1) = .Criteria1
                    If .Operator <> 0 Then
                        filterCriteria(i, 2) = .Operator
                        On Error Resume Next
                        filterCriteria(i, 3) = .Criteria2
                        On Error GoTo ErrorHandler
                    End If
                End If
            End With
        Next i
        
        ' Filtre oklarını tamamen kaldır (gizli satırları açar)
        ws.AutoFilterMode = False
    End If

    ' 2. EĞER AKILLI TABLO (ListObject) VARSA ONUN FİLTRELERİNİ DE GEÇİCİ OLARAK TEMİZLE
    tblCount = ws.ListObjects.Count
    If tblCount > 0 Then
        ReDim tblNames(1 To tblCount)
        ReDim tblFilterStates(1 To tblCount)
        For i = 1 To tblCount
            Set tbl = ws.ListObjects(i)
            tblNames(i) = tbl.Name
            tblFilterStates(i) = tbl.ShowAutoFilter
            If tbl.ShowAutoFilter Then
                tbl.AutoFilter.ShowAllData
            End If
        Next i
    End If

    ' 3. GERÇEK SON SATIR VE SÜTUNU BUL (Tüm filtreler kalktığı için gizli hücre kalmadı)
    ' Not: LookIn:=xlFormulas gizli olmayan tüm hücrelerdeki değer ve formülleri tarar.
    Set lastRowCell = ws.Cells.Find(What:="*", After:=ws.Cells(1, 1), LookIn:=xlFormulas, _
        LookAt:=xlPart, SearchOrder:=xlByRows, SearchDirection:=xlPrevious, _
        MatchCase:=False, SearchFormat:=False)
        
    Set lastColCell = ws.Cells.Find(What:="*", After:=ws.Cells(1, 1), LookIn:=xlFormulas, _
        LookAt:=xlPart, SearchOrder:=xlByColumns, SearchDirection:=xlPrevious, _
        MatchCase:=False, SearchFormat:=False)

    If lastRowCell Is Nothing Or lastColCell Is Nothing Then
        MsgBox "Sayfada herhangi bir değer veya formül bulunamadı. İşlem yapılmadı.", _
               vbInformation, "Kullanılmayan Biçimleri Temizle"
        GoTo RestoreFilters
    End If

    lastRow = lastRowCell.Row
    lastCol = lastColCell.Column

    ' 4. VERİ ALANI DIŞINDAKİ BİÇİMLENDİRMELERİ TEMİZLE
    If lastRow < ws.Rows.Count Then
        ws.Rows(CStr(lastRow + 1) & ":" & CStr(ws.Rows.Count)).ClearFormats
    End If
    If lastCol < ws.Columns.Count Then
        ws.Range(ws.Cells(1, lastCol + 1), ws.Cells(1, ws.Columns.Count)).EntireColumn.ClearFormats
    End If

    ' Kullanılan alanı (UsedRange) yenile
    Set refreshedRange = ws.UsedRange
    completed = True

RestoreFilters:
    ' 5. YEDEKLENEN STANDART FİLTRELERİ GERİ YÜKLE
    If hasAutoFilter Then
        ws.Range(filterRangeAddress).AutoFilter
        For i = 1 To UBound(filterCriteria, 1)
            If Not IsEmpty(filterCriteria(i, 1)) Then
                If IsEmpty(filterCriteria(i, 2)) Then
                    ws.Range(filterRangeAddress).AutoFilter Field:=i, Criteria1:=filterCriteria(i, 1)
                ElseIf IsEmpty(filterCriteria(i, 3)) Then
                    ws.Range(filterRangeAddress).AutoFilter Field:=i, Criteria1:=filterCriteria(i, 1), Operator:=filterCriteria(i, 2)
                Else
                    ws.Range(filterRangeAddress).AutoFilter Field:=i, Criteria1:=filterCriteria(i, 1), Operator:=filterCriteria(i, 2), Criteria2:=filterCriteria(i, 3)
                End If
            End If
        Next i
    End If

    GoTo CleanExit

ErrorHandler:
    errorNumber = Err.Number
    errorDescription = Err.Description

CleanExit:
    If settingsCaptured Then
        On Error Resume Next
        Application.Calculation = oldCalculation
        Application.EnableEvents = oldEnableEvents
        Application.ScreenUpdating = oldScreenUpdating
        On Error GoTo 0
    End If

    If errorNumber <> 0 Then
        MsgBox "Temizleme işlemi tamamlanamadı:" & vbCrLf & errorDescription, _
               vbCritical, "Kullanılmayan Biçimleri Temizle"
    ElseIf completed Then
        MsgBox "Veri alanı dışındaki tüm biçimlendirmeler temizlendi." & vbCrLf & _
               "Son veri hücresi: " & ws.Cells(lastRow, lastCol).Address(False, False) & vbCrLf & _
               "Kaydırıcıların (Scrollbar) güncellenmesi için dosyayı kaydedin.", _
               vbInformation, "Kullanılmayan Biçimleri Temizle"
    End If
End Sub
