---
author: Kevin
pubDatetime: 2023-01-31T11:56:00Z
title: Network Concept and Protocols
postSlug: network-concept-and-protocols
featured: true
draft: false
tags:
  - network
ogImage: ""
description: Pluralsight course by Ross Bagurdes
---

## Network Concept

### What is Data Network?

It's a system of hardware, software, and protocols used to move information from one device to another.

### The OSI Model

There are lots of different protocols involved in data networking, the Open Systems Interconnection (OSI) model is to categorizes each of the protocols, and gives the exact order that those protocols need to be processed in.

#### Layer 1: Physical Layer

The physical layer is the lowest layer of the OSI model. It is responsible for the physical transmission of data over the network.
It is the layer that deals with the physical characteristics of the network, such as the cabling, connectors, and other hardware components.

#### Layer 2: Data Link Layer

In data link layer, there are protocols like Ethernet, DOCSIS, and they provide rules, specifications for electronics, as well as how to create and move a message across those links. It is to facilitate communication from one device to another.

-> This layer is responsible for framing data into packets, detecting and correcting errors in the data, and controlling access to the physical medium.

#### Layer 3: Network Layer

The network layer is responsible for the logical addressing of devices on the network. It is to provide a way for devices to find each other and communicate with each other. We use IP(Internet Protocol) addressing to identify devices on the network.

-> This layer provides routing and addressing functions to enable data to be transmitted across different networks and through different routers.

The network layer allows us to make use of the data link layer and physical layer to send messages long distances across a network.

#### Layer 4: Transport Layer

The transport layer is responsible for the delivery of data from one device to another. It is to provide a way for devices to send data to each other and to make sure that data is delivered correctly.

Transport layer is in order for us to have a conversation between the client and the server. We need a way to build a _session_ in between these two devices so that they can send information between each other and understand that the conversation is meant for specific things in that network communication.

It is responsible for setting up a session typically using TCP(Transmission Control Protocol). It has a handshake process, and it builds a connection, and it uses the network layer to find where in the world those devices are. It uses the data link layer to communicate those messages from device to device to device to device until they reach their destinations, and that all happens on the physical layer, which is our wires and cables that connect our network together.

-> This layer manages end-to-end communication between devices and ensures the reliable delivery of data.

#### Layer 5: Session Layer

-> This layer manages the establishment, maintenance, and termination of sessions between applications on different devices.

#### Layer 6: Presentation Layer

This layer is to translate between systems using ASCII and systems using EBCDIC.

-> This layer is responsible for data representation and encoding, including compression, encryption, and decryption.

#### Layer 7: Application Layer

We need a way to transfer information that's in a usable format. One of those ways is to use a web browser and browse to a website. The website is nothing more than a document with information in it. The web browser is an application that makes use of a protocol in order to request and transfer information.

Which is HyperText Transfer Protocol (HTTP) and its sibling called HTTPS, the encrypted version of HTTP. It is a protocol that is used to transfer data between a client and a server.

-> This layer provides services to applications for network communication, including email, file transfer, and remote login.

![OSI Model](/src/content/blog//network-concept-and-protocols/osi-model.png)

### Encapsulation and the OSI Model

How does the OSI model work to send a message from one device to another?

1. In the Application layer, we use HTTPs protocol to send a message from a client to a server.
2. We need to break up the data into smaller chunks because some protocols, specifically Ethernet, has a maximum amount of data that can transfer for each _frame_ that we send.
3. In the Transport layer, since it's setting up a session between client and server, we're going to have specific information in to allow that to happen. so after we have the broken up data, we need to add a header to each of those _segments_. The header contains information about the data that's being sent, such as the source and destination ports, sequence and acknowledgment numbers, and window size. Each _segments_ includes a chunk of data and TCP header.
   ![Transport Layer](/src/content/blog/network-concept-and-protocols/transport-layer.png)
4. Now in order to know where to send the data, we need to tell it what is the source and destination IP address are. So we take our _segments_, which is going to keep that session between our endpoints, and then we send it down to the Network layer. We take the _segment_ as payload with the header contains source and destination IP address, TTL(time to live) and other information. This is _packet_, each _packet_ includes _segment_ and IP header.
   ![Network Layer](/src/content/blog/network-concept-and-protocols/network-layer.png)
5. In order to get our _packet_ from switch to router, we need to add a header that contains source and destination MAC address and layer 3 protocol. Ths is _frame_, each _frame_ includes a _packet_ and Ethernet header.
   ![Data Link Layer](/src/content/blog/network-concept-and-protocols/data-link-layer.png)
6. Once we have our _frame_ constructed, we can take the _frame_ and send it down to the Physical layer. The Physical layer will just convert data into 1 and 0 signal.
   ![Physical Layer](/src/content/blog/network-concept-and-protocols/physical-layer.png)

### Application Layer Protocols

#### Transfer Files

##### HTTP, HTTPs

In application layer, we use HTTP or HTTPs to transfer HTML documents between a web server to a web browser. While is transfer layer, they are associated with a specific port number. for port 80 and 443, we typically associate with using web services.In port 443, we use SSL(secure socket layer) or TLS(transport layer security) to encrypt the data.

| Application Layer Protocol          | Port Number in Transport Layer |
| ----------------------------------- | ------------------------------ |
| HTTP (Hyper Text Transfer Protocol) | 80                             |
| HTTPs (secure HTTP)                 | 443                            |

##### FTP, sFTP and TFTP

They are file transfer protocols and they are used to transfer files.

| Application Layer Protocol            | Port Number in Transport Layer |
| ------------------------------------- | ------------------------------ |
| FTP (File Transfer Protocol)          | 20, 21                         |
| sFTP (secure FTP)                     | 22                             |
| TFTP (Trivial File Transfer Protocol) | 69                             |

##### Email

| Application Layer Protocol              | Port Number in Transport Layer | Notes                                |
| --------------------------------------- | ------------------------------ | ------------------------------------ |
| SMTP (Simple Mail Transfer Protocol)    | 25/995(secure)                 | Send email from client to server     |
| POP3 (Post Office Protocol 3)           | 110/993(secure)                | Retrieve email from server to client |
| IMAP (Internet Message Access Protocol) | 143/465(secure)                | Retrieve email from server to client |

#### Authentication Protocols

| Application Layer Protocol                   | Port Number in Transport Layer |
| -------------------------------------------- | ------------------------------ |
| LDAP (Lightweight Directory Access Protocol) | 389                            |
| LDAPs                                        | 636                            |

#### Network Service Protocols

- DHCP is responsible for assigning IP addresses to your server on a network.
- DNS is responsible for translating domain names into IP addresses.
  - we can run `nslookup google.com` to see the IP address
- NTP is responsible for synchronizing the time on devices on a network.
  - UTC is the standard time zone that we use to synchronize time across the world.

| Application Layer Protocol           | Port Number in Transport Layer |
| ------------------------------------ | ------------------------------ |
| DHCP (Dynamic Host Control Protocol) | 67, 68                         |
| DNS (Domain Name System)             | 53                             |
| DoH (DNS over HTTPs)                 | 443                            |
| NTP (Network Time Protocol)          | 123                            |

#### Network Management Protocols

When we have devices on our network and we want to manage them, we need to have a way to communicate with them. We need to have a protocol that allows us to send commands to the device and receive information back from the device.

- SNMP is a protocol that allows devices send information back to the centralized server, like log messages, prot up and down, etc.
- Syslog is similar to SNMP, which allows devices to send log to the centralized server.
- RDP allows us to access the desktop of a remote computer on our network.

| Application Layer Protocol               | Port Number in Transport Layer |
| ---------------------------------------- | ------------------------------ |
| SSH (Encrypted)                          | 22                             |
| Telnet                                   | 23                             |
| SNMP (Simple Network Management Protocol | 161/162                        |
| Syslog                                   | 514                            |
| RDP (Remote Desktop Protocol)            | 3389                           |

#### Audio/Visual Protocols

The protocols that allows us to have voice/video phone calls over the internet.

| Application Layer Protocol        | Port Number in Transport Layer | Notes           |
| --------------------------------- | ------------------------------ | --------------- |
| H.323                             | 1720                           | video and audio |
| SIP (Session Initiation Protocol) | 5060/5601                      | audio           |

### TCP and UDP
