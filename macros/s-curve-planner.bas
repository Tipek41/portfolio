Attribute VB_Name = "SCurvePlanner"
Option Explicit
Public Function SCurveCum(ByVal a As Double, ByVal b As Double, ByVal t As Double) As Double
 If t <= 0 Then
  SCurveCum = 0
 ElseIf t >= 1 Then
  SCurveCum = 1
 Else
  SCurveCum = 10 * t ^ 2 * (1 - t) ^ 2 * (a + b * t) + t ^ 4 * (5 - 4 * t)
 End If
End Function
Public Function SCurvePeriod(ByVal a As Double, ByVal b As Double, ByVal firstPeriod As Long, ByVal lastPeriod As Long, ByVal period As Long) As Variant
 Dim n As Long, k As Long
 If firstPeriod > lastPeriod Then
  SCurvePeriod = CVErr(xlErrValue): Exit Function
 End If
 If period < firstPeriod Or period > lastPeriod Then
  SCurvePeriod = 0: Exit Function
 End If
 n = lastPeriod - firstPeriod + 1
 For k = 1 To n
  If SCurveCum(a, b, k / n) + 0.0000000001 < SCurveCum(a, b, (k - 1) / n) Then
   SCurvePeriod = CVErr(xlErrNum): Exit Function
  End If
 Next k
 SCurvePeriod = SCurveCum(a, b, (period - firstPeriod + 1) / n) - SCurveCum(a, b, (period - firstPeriod) / n)
End Function
Public Function SCurveAmount(ByVal budget As Double, ByVal a As Double, ByVal b As Double, ByVal firstPeriod As Long, ByVal lastPeriod As Long, ByVal period As Long) As Variant
 Dim p As Variant
 If budget < 0 Then
  SCurveAmount = CVErr(xlErrNum): Exit Function
 End If
 p = SCurvePeriod(a, b, firstPeriod, lastPeriod, period)
 If IsError(p) Then
  SCurveAmount = p
 Else
  SCurveAmount = budget * CDbl(p)
 End If
End Function
Public Sub CreateSCurveTemplate()
 Dim ws As Worksheet, i As Long, chart As ChartObject
 Set ws = ActiveWorkbook.Worksheets.Add
 ws.Name = "S-Curve " & Format(Now, "hhmmss")
 ws.Range("A1").Value = "PROJECT S-CURVE | CASH FLOW"
 ws.Range("A3").Value = "Project budget": ws.Range("B3").Value = 10000000
 ws.Range("A4").Value = "Start period": ws.Range("B4").Value = 1
 ws.Range("A5").Value = "End period": ws.Range("B5").Value = 12
 ws.Range("A6").Value = "Curve a": ws.Range("B6").Value = 0
 ws.Range("A7").Value = "Curve b": ws.Range("B7").Value = 0
 ws.Range("A9:D9").Value = Array("Period", "Monthly cost", "Cumulative cost", "Cumulative %")
 For i = 10 To 129
  ws.Cells(i, 1).Formula = "=$B$4+ROW()-10"
  ws.Cells(i, 2).Formula = "=IF(A" & i & ">$B$5,NA(),SCurveAmount($B$3,$B$6,$B$7,$B$4,$B$5,A" & i & "))"
  ws.Cells(i, 3).Formula = "=IF(A" & i & ">$B$5,NA(),SUM($B$10:B" & i & "))"
  ws.Cells(i, 4).Formula = "=IFERROR(C" & i & "/$B$3,0)"
 Next i
 ws.Range("B10:C129").NumberFormat = "#,##0.00"
 ws.Range("D10:D129").NumberFormat = "0.0%"
 ws.Columns("A:D").AutoFit
 Set chart = ws.ChartObjects.Add(380, 45, 590, 330)
 chart.Chart.ChartType = xlLine
 chart.Chart.SetSourceData ws.Range("A9:A129,D9:D129")
 chart.Chart.HasTitle = True
 chart.Chart.ChartTitle.Text = "Cumulative S-Curve"
 ws.Range("B3:B7").Interior.Color = RGB(225, 240, 255)
 ws.Range("A1:D1").Font.Bold = True
 ws.Range("A9:D9").Font.Bold = True
End Sub