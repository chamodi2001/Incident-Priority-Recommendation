resource "aws_sns_topic" "disk_alerts" {
  name = "ec2-disk-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.disk_alerts.arn
  protocol  = "email"
  endpoint  = var.alarm_email
}

resource "aws_cloudwatch_metric_alarm" "disk_usage" {
  alarm_name          = "ec2-root-disk-usage-${var.instance_id}"
  alarm_description   = "Alarm when root (/) disk usage exceeds 75% on ${var.instance_id}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  period              = 1800           #  seconds/30mins
  statistic           = "Average"     # or "Maximum" if you want spike-sensitive
  threshold           = 98
  namespace           = "CWAgent"
  metric_name         = "disk_used_percent"

  dimensions = {
    InstanceId = var.instance_id
    path       = "/"
  }

  alarm_actions = [
    aws_sns_topic.disk_alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.disk_alerts.arn
  ]
}

