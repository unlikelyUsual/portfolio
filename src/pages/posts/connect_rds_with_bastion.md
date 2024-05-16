---
layout: ../../layouts/post.astro
title: "Connect Local DB Client to RDS"
pubDate: 2023-12-16
description: "How to connect to RDS with local client with Bastion HOST"
author: "Prabhat"
excerpt: To use an Amazon EC2 instance as a jump server to connect to a private Amazon RDS DB instance from a local machine
image:
  src:
  alt:
tags: ["database", "rds", "security"]
---

Connecting to an AWS RDS instance via a bastion host ensures a secure and efficient way to manage your database within a VPC. This guide will walk you through the steps required to set up your VPC, RDS, and EC2 instances, and how to establish a connection from local client.

![Bastion Host](/images/bastion_aws.png "Bastion Host")

## VPC Setup

This enables you to create secure and efficient architectures by segmenting your resources and applying stringent access controls. VPCs facilitate the deployment of web applications and databases in a secure and scalable manner, leveraging AWS's extensive infrastructure.

## Steps

1. Create Private Subnets
   - Without Internet Gateway: Ensure that your private subnets do not have any Internet Gateway (IG) attached.
   - Remove IG or NAT: Remove any IG or NAT gateway attached in the route table of the private subnets.
   - Multiple Zones: Ensure that your private subnets are in different availability zones to meet security requirements.
2. Create a Subnet Group
   - Navigate to RDS Console: From the left side menu in the RDS console, create a subnet group.
   - Include Private Subnets: Add the private subnets created earlier into this subnet group.
3. Create a Public Subnet
   - Public Access: Ensure that this subnet has an Internet Gateway attached to it, allowing public access.

## RDS Setup

> Make sure your RDS instance is inside the **Private subnets**

1. Move Instance to private subnet group
   - Private Subnet Group: When creating the RDS instance, choose the subnet group containing the private subnets.
   - If instance is in both private and public then use this for move them to private subnets [here](https://repost.aws/knowledge-center/rds-move-to-private-subnet)
2. Configure Security Groups
   - RDS Security Group: Create or update the security group for your RDS instance.
   - Allow Inbound Access: Add rules to allow inbound traffic from the EC2 security group.

## EC2 Setup

1. Create an EC2 Instance
   - Public Subnet: Launch your EC2 instance in the public subnet.
   - Elastic IP: Assign an elastic IP to the EC2 instance for consistent connectivity.
2. Configure Security Groups
   - Outbound Rule: Ensure the security group of the EC2 instance allows outbound traffic to the RDS security group.

## Check Connection to RDS Instance

Command Template :

```bash
ssh -i pemFilePath.pem -4 -N -L randomPort:rdsInstanceUrl:rdsInstancePort ec2User@ec2IP
```

Example :

```bash
ssh -i pg.pem -4 -N -L 5000:test-db.abc.region.rds.amazonaws.com:5432 ubuntu@0.0.0.0
```

## Connect with clint like DBeaver

1. Install [DBeaver](https://dbeaver.io/) Community version
2. Provide RDS instance detail in connection details, Like URL, username, password, port
3. Go to SHH details section
4. Provide EC3 host URL, user and PEM file
5. Test Connection
