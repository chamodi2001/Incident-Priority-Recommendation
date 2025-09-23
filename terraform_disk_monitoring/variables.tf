variable "aws_region" {
  type    = string
  default = "us-east-2"
}

variable "instance_id" {
  type        = string
  description = "EC2 instance ID to monitor i-0c69d25875f05d48b"
}

variable "alarm_email" {
  type        = string
  description = "Email address to receive alarm notifications"
}
