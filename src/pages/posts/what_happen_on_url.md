---
layout: ../../layouts/post.astro
title: "From Key Strokes to Connections: How Typing a URL Powers the Internet"
pubDate: 2023-11-30
description: "From Key Strokes to Connections: How Typing a URL Powers the Internet"
author: "Prabhat"
excerpt: You go to this page by typing in a url or clicking on a link to the page. Have you ever thought about what happens behind the scenes?
image:
  src:
  alt:
tags: ["internet", "web", "dns"]
---

Every day you open up your browser and navigate to your favorite websites — whether it be social media, news, or e-commerce sites. You go to this page by typing in a url or clicking on a link to the page. Have you ever thought about what happens behind the scenes?

In this post, we’ll look at what happens when you type a URL into your browser and press enter. End to end, the process involves the browser, operating system, internet service provider, the server, and services running on that server.

### Components

https://prabhat.me/path_to_file/index

- https:// : Protocol (https://, ftp://, file://)
- prabhat.me : Domain (google)
- index : Page Name requested

### Steps

1. Look up the IP address
2. Initiate Connection
3. Get specific page from server
4. Render the page.

Websites are just things such as HTML, CSS, JavaScript, and images. To make sure they are available to everyone it is store on servers.

## Look up the IP

Every devices connected on Internet has unique address called IP Address. It comes in two flavour ipv4 and ipv6.

- IPv4 : 32-bit address which approximately 4.3 billion unique addresses.
- IPv6 : 128-bit address which is 3.4×10^38, to accommodate the increasing number of devices

Since numbers are hard to remember so we use mapping which help us map numbers(address) to domain called DNS (domain name server)

Browser does DNS lookup for us and get the ipv4 address from the Browser DNS cache > OS Cache > Local Network Cache > ISP DNS Cache > Authoritative Name Server > Root Name Server.

## Initiate Connection

Once the browser know the address of server it tries a connection handshake.
Packets travel through router > ISP > SWITCH > Networks. Using transmission control protocol like TCP/IP.

#### TCP

- handles ordering of packets
- handles the connection to server with acknowledgement and handshake model
- Handle which route to take in network to reach destination

### IP

- handles delivering of packets from source to target
- Each packet as sender details and address of destination
- It doesn't not handle the ordering of packets

To communicate it uses HTTP as a set of rules to defined between browser and server
for eg :

```
GET /index HTTP/1.1
```

This request tells the server to fetch the index resource as GET method with HTTP 1.1 protocol

Now server can respond back with content of the resource.
for eg :

```html
HTTP/1.1 200 OK Content-Type: text/html; charset=utf-8 ... Headers

<!doctype html>
<html lang="en">
  <head>
    Index
  </head>
  <body>
    This is the Index page
  </body>
</html>
```

This response constructed in format protocol/version and with status (200, 400, 500, ... many more), headers and then content

## Render the page.

Once the browser has received the response from the server, it inspects the response headers for information on how to render the resource. The Content-Type header above tells the browser it received an HTML resource in the response body. Lucky for us, the browser knows what to do with HTML!
The first GET request returns HTML, the structure of the page. But if you inspect the HTML of the page (or any web page) with your browser’s dev tools, you’ll see it references other Javascript, CSS, image resources and requests additional data in order to render the web page as designed.
As the browser is parsing and rendering the HTML, it is making additional requests to get Javascript, CSS, images, and data. It can do much of this in parallel, but not always and that’s a story for a different post.

<!DOCTYPE html>
<html lang="en">
<head>
    THE REST OF THE HTML

The browser considers a status code in the 200s to be successful. The response was 200, so the browser knows to render the response.
Resources can be static files, either text (i.e index.html) or non-text data (i.e. logo.img). Browsers aren’t always requesting static files, though. Often, these are dynamic resources generated at the time of the request and there is no file associated with the resource. In fact, in this request, that’s exactly what is happening. There is no file hello-world, but the server still knows how to process the request. The server generates a dynamic resource, building the HTML from fragments or templates and combining it with dynamic data to send back in the response, as text, so the browser can render the page.
Now that you know how the server builds the response to send back to the browser, let’s take a look at how the browser handles the response.

Wrapping Up
You did it! You traced a URL request from the browser all the way to the server hosting it and it’s response back to the browser to be rendered. We covered the relationship between websites, servers, IP addresses and stepped through each of the steps that your browser goes through when you type a URL into your browser and press enter. For review, here are those six steps:
