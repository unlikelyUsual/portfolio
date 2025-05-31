---
layout: ../../layouts/post.astro
title: "How HTTPS Works: Securing Data Transmission on the Web"
pubDate: 2024-01-17
description: "Learn how HTTPS encrypts your data to ensure secure communication between your browser and web servers"
author: "Prabhat"
excerpt: "A deep dive into how HTTPS uses encryption to secure data transmission across the internet"
image:
  src: "/images/https_encryption.png"
  alt: "HTTPS encryption process diagram"
tags: ["internet", "web", "dns", "security", "encryption"]
---

Hypertext Transfer Protocol Secure (HTTPS) is an extension of the Hypertext Transfer Protocol (HTTP.) HTTPS transmits encrypted data using Transport Layer Security (TLS.) If the data is hijacked online, all the hijacker gets is binary code.

How is the data encrypted and decrypted?

## The HTTPS Handshake Process

### Step 1 - TCP Connection Establishment

The client (browser) and the server establish a TCP connection. This is the foundation upon which the secure connection will be built.

### Step 2 - TLS Handshake Begins

The client sends a "client hello" to the server. The message contains a set of necessary encryption algorithms (cipher suites) and the latest TLS version it can support. The server responds with a "server hello" so the browser knows whether it can support the algorithms and TLS version.

The server then sends the SSL certificate to the client. The certificate contains the public key, host name, expiry dates, etc. The client validates the certificate.

### Step 3 - Key Exchange

After validating the SSL certificate, the client generates a session key and encrypts it using the public key. The server receives the encrypted session key and decrypts it with the private key.

### Step 4 - Secure Data Transmission

Now that both the client and the server hold the same session key (symmetric encryption), the encrypted data is transmitted in a secure bi-directional channel.

## Why Switch to Symmetric Encryption?

Why does HTTPS switch to symmetric encryption during data transmission? There are two main reasons:

1. **Security**: The asymmetric encryption goes only one way. This means that if the server tries to send the encrypted data back to the client, anyone can decrypt the data using the public key.

2. **Performance**: The asymmetric encryption adds quite a lot of mathematical overhead. It is not suitable for data transmissions in long sessions.

## Benefits of HTTPS

HTTPS provides several important benefits:

- **Data Integrity**: Ensures that data hasn't been altered during transmission
- **Authentication**: Verifies that users are communicating with the intended website
- **Privacy**: Prevents eavesdropping and man-in-the-middle attacks
- **Trust**: Builds user confidence with visual security indicators (padlock icon)
- **SEO Advantage**: Search engines like Google give preference to secure websites

## How to Recognize HTTPS

You can easily identify if a website is using HTTPS by looking at:

1. The URL in your browser's address bar, which should start with "https://"
2. A padlock icon displayed next to the URL
3. In some browsers, a green address bar for sites with Extended Validation certificates

## Conclusion

HTTPS has become the standard for secure web communication, protecting sensitive information like login credentials, payment details, and personal data. Understanding how it works helps appreciate the complex security mechanisms that keep our online activities safe.

The next time you see that padlock icon in your browser, you'll know exactly what's happening behind the scenes to protect your data!
