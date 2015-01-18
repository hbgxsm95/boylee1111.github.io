---
layout: post
title: Pitfall of GCDAsyncSocket
date: 2014-01-09 08:52:10.000000000 +01:00
summary: "I use CocoaAsyncSocket, a 3rd lib that encapsulates the <code>CFNetwork</code> in iOS, to achieve data transmission via TCP/IP protocol."
categories:
- Development
tags:
- GCD
- iOS
- 3rd-lib
- objective-c
- GCDAsyncSocket
status: publish
type: post
published: true

---

I use CocoaAsyncSocket, a 3rd lib that encapsulates the `CFNetwork` in iOS, to achieve data transmission via TCP/IP protocol. The introduction and usage of this library is [here](https://github.com/robbiehanson/CocoaAsyncSocket/wiki).

According to the documentation, the class that has achieved the `GCDAsyncSocketDelegate` is mandatory. Then I use singleton to decouple the view controller and command sender like this:

{% highlight objective-c linenos %}
#import <Foundation/Foundation.h>
#import "GCDAsyncSocket.h"

@interface CommandSender : NSObject <GCDAsyncSocketDelegate>

+ (CommandSender *)sharedSender;

- (void)writeDataTest;

@end
{% endhighlight %}

{% highlight objective-c linenos %}
#import "CommandSender.h"

#define LOCAL_IP_ADDRESS @"127.0.0.1"
#define PORT 4000

@interface CommandSender () {
    GCDAsyncSocket *asyncSocket;
}

@end

@implementation CommandSender

// Singleton
+ (CommandSender *)sharedSender
{
    static dispatch_once_t onceToken;
    __strong static id _sharedSender = nil;
    dispatch_once(&onceToken, ^{
        _sharedSender = [[CommandSender alloc] initWithConnection];
    });
    return _sharedSender;
}

- (id)initWithConnection
{
    if (self = [super init]) {
        // Initialize the GCDAsyncSocket
        asyncSocket = [[GCDAsyncSocket alloc] initWithDelegate:self
                                                 delegateQueue:dispatch_get_main_queue()];
    }

    // Build connection with server
    NSError *err = nil;
    if (![asyncSocket connectToHost:LOCAL_IP_ADDRESS
                             onPort:PORT
                        withTimeout:10
                              error:&err]) {
        NSLog(@"Connection error %@", err);
    }

    return self;
}

// Test function of sending message
- (void)writeDataTest
{
    [asyncSocket writeData:[@"Well, server is waiting for you." dataUsingEncoding:NSASCIIStringEncoding]
               withTimeout:-1
                       tag:888];
}

#pragma mark - delegate

// Callback function when connecting successfully
- (void)socket:(GCDAsyncSocket *)sock didConnectToHost:(NSString *)host port:(uint16_t)port
{
    NSLog(@"Connecting successfully. Host is %@, port is %d", host, port);
}

// Callback function when sending data successfully
- (void)socket:(GCDAsyncSocket *)sock didWriteDataWithTag:(long)tag
{
    NSLog(@"Writing data successfully, Tag = %ld", tag);
}
{% endhighlight %}

I test it in `AppDelegate` like this:

{% highlight objective-c linenos %}
[[CommandSender sharedSender] writeDataTest];
{% endhighlight %}

There is no any logging messages neither failed nor succeed. Then I try to invoke the test function in view controller, problem solved. The singleton is out of work because the <span class="lang:objc decode:true  crayon-inline">AppDelegate</span> was released early, causing the socket to be released early as well. This should be the basic knowledge of GCD, but still need to be taken into account.

Don't be a victim.