---
layout: ../../layouts/post.astro
title: "Payment Handling"
pubDate: 2023-12-24
description: "Unfold how to handle payment at fintech startup"
author: "Prabhat"
excerpt: Designing and developing a secure, robust, and scalable solution for handling payments
image:
  src:
  alt:
tags: ["fintech", "payment"]
---

In this blog, we are going to unfold everything that there is to know about, the **Payment Handling,** and more. We bet by the end of the blog, you will have a better understanding of system.

As a backend engineer at Fello, a startup in the e-financial space, I was tasked with designing and developing a secure, robust, and scalable solution for handling payments.

The growth rate of electronic transactions went higher than [10%](https://www.mckinsey.com/~/media/mckinsey/industries/financial%20services/our%20insights/accelerating%20winds%20of%20change%20in%20global%20payments/2020-mckinsey-global-payments-report-vf.pdf) in India. Digital payments are on rise every year. Every business has unique needs, and every business needs tailored payment solutions.

## Easy Right ?

![Get Ready](/src/images/tenor.gif "Get Ready")

Let me tell you, it was no easy feat. But with a little bit of grit and a lot of coffee, we were able to create a system that not only met all of our requirements, but exceeded them.

First and foremost, we knew that speed was key. No one wants to sit around twiddling their thumbs while they wait for their payment to go through. So, we integrated a payment gateway that could process transactions lightning fast. This way, our customers could complete their purchases and be on their way in no time.

Next, we wanted to make sure our payment system was flexible. We knew that every business has unique needs, so we made sure that our solution could easily be customized to fit the specific requirements of each of our clients.

Of course, security was a top priority. We knew that any breaches or security lapses could be devastating for our business and our customers, so we went above and beyond to encrypt all payment information and implemented strict security protocols to protect against any potential threats.

We also made sure that our system was robust and able to handle a high volume of transactions. We tested and stress-tested our system to ensure it could handle any load that was thrown at it.

One of the most important features for our customers was the ability to track and manage their payments. With our payment management and tracking system, our customers could easily view their transaction history, track the status of their payments, and resolve any issues that may arise.

Last but not least, we added a payment notification feature, so our customers would be informed of every step of the payment process, and they could be sure that their transaction went through successfully.

## Architecture overview

![Payment Architecture](/src/images/architecture.png "Logo Title Text 1")

When a user presses the "pay" button on our app, it sets the payment process in motion. Our backend sends the generated orderId to the client, which then initiates the Payment Gateway. The user completes the payment and the gateway closes with a callback. The client then displays a "Processing" screen to let the user know that the payment is being processed.

But the show must go on. We keep the performance going with a Google Cloud task that checks the transaction status every 15 minutes. If the status is still pending, the task will trigger again until the terminal status is updated by the Payment Gateway. This ensures that no transactions are left hanging and that our customers always know the status of their payment.

Next, we use AWS step functions to parse the callback payload and send it to various AWS Lambda functions for processing. This allows us to segregate the payload and handle each piece separately, ensuring that everything is processed efficiently and securely.

We also keep an CRON jobs running at the end of each day to process any pending transactions from that day. This way, we can ensure that all transactions are processed in a timely manner and that our customers' accounts are updated accordingly.

But, as with any performance, there are always a few missteps. In the rare case of a failure in the callback process, we initiate a refund to the user and notify them promptly.

By using GCP Cloud Tasks, AWS step functions, and CRON Jobs, we've created a system that is efficient, secure, and robust enough to handle high volumes of transactions. And, just like a well-executed performance, our payment handling system is a thing of beauty to behold.

## In Conclusion

![Finally!](/src/images/one_punch.webp "Finally")

All in all, developing a payment handling system for Fello was a challenging but rewarding experience. And I'm happy to say that our hard work paid off - our system is now being used by customers all over the country. So, the next time you make a purchase on our platform and the payment goes through smoothly, you know who to thank (hint: it's me)
