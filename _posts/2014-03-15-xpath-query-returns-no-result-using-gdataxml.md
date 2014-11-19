---
layout: post
title: XPath Query Returns No Result Using GDataXML
date: 2014-03-15 14:47:22.000000000 +01:00
summary: "Recently I\'m on a project covered SOAP, knows as \"Simple Object Access Protocol\". SOAP is a simple, light protocol specification based on XML to exchange structured information in the implement of WebService."
categories:
- Development
tags:
- 3rd-lib
- iOS
- objective-c
- GDataXML-HTML
status: publish
type: post
published: true

---

Recently I'm on a project covered SOAP, knows as "Simple Object Access Protocol". SOAP is a simple, light protocol specification based on XML to exchange structured information in the implement of WebService. More information about SOAP is [Here](http://en.wikipedia.org/wiki/SOAP).

I used `GDataXML-HTML`, a 3rd-lib of Obejective-C, to parse the XML data because of its simplicity and high efficiency. By the way, Choose a proper XML Parser is important, here is an article related this discussion:

**[XML Tutorial for iOS: How To Choose The Best XML Parser for Your iPhone Project](http://www.raywenderlich.com/553/xml-tutorial-for-ios-how-to-choose-the-best-xml-parser-for-your-iphone-project)**

The XML to be parsed is like this:

{% highlight xml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<RequestResponse xmlns="http://url/">
	<Header attribute=“xxx” />
	<DomesticFlightRoute>
		<RecordCount>112</RecordCount>
		<FlightsList>
			<DomesticFlightData>
				<DepartCityCode>*</DepartCityCode>
				<ArriveCityCode>*</ArriveCityCode>
				……
			</DomesticFlightData>
			<DomesticFlightData>
				……
			</DomesticFlightData>
	</DomesticFlightRoute>
</RequestResponse>
{% endhighlight %}

I wanted to retrieve all the `<DomesticFlightData>` elements in the response using XPath. The code I wrote like this:

{% highlight objective-c linenos %}
// doc is an instance of GDataXMLDocument or GDataElement
NSArray *domesticFlights = [doc nodesForXPath:@"//FlightList/DomesticFlightData"
                                        error:nil];
NSLog(@"flights count = %ld", [domesticFlights count]);
{% endhighlight %}

But the Log result is always 0. This made me confusing. Then I tried several different XPath queries to retrieve the data and still no luck. There were neither results nor errors.

Later, I knew the correct XML namespace is mandatory while using the XPath query. According to the response, I knew the namespace is `http://url/`, but the GData didn't know it at all. So I digged into the source code of GDataXML, and found this variable:

{% highlight objective-c linenos %}
_EXTERN const char* kGDataXMLXPathDefaultNamespacePrefix _INITIALIZE_AS("_def_ns");
{% endhighlight %}

I presumed this namespace will be added to the nodes without an explicit namespace. By searching this variable I found this:

{% highlight objective-c linenos %}
// step through the namespace, if any, and register each with the
// xpath context
if (nsNodePtr != NULL) {
    for (xmlNsPtr nsPtr = nsNodePtr->ns; nsPtr != NULL; nsPtr = nsPtr->next) {

        // default namespace is nil in the tree, but there's no way to
        // register a default namespace, so we'll register a fake one,
        // _def_ns
        const xmlChar* prefix = nsPtr->prefix;
        if (prefix == NULL) {
            prefix = (xmlChar*) kGDataXMLXPathDefaultNamespacePrefix;
        }

        int result = xmlXPathRegisterNs(xpathCtx, prefix, nsPtr->href);
        if (result != 0) {
#if DEBUG
            NSCAssert1(result == 0, @"GDataXMLNode XPath namespace %s issue",
                                       prefix);
#endif
        }
    }
}
{% endhighlight %}

Then I tried to retrieve data like this:

{% highlight objective-c linenos %}
NSArray *domesticFlights = [doc nodesForXPath:@"//_def_ns:FlightList/_def_ns:DomesticFlightData"
                                        error:nil];
NSLog(@"flights count = %ld", [domesticFlights count]);
{% endhighlight %}

**Excellent. Problem solved.**


In addition, here is the approach to how to register namespaces via `GDataXML-HTML` manually.

First, scanning all the namespaces like this:

{% highlight objective-c linenos %}
NSArray *namespaceURIs = [doc.rootElement namespaces];
{% endhighlight %}

Then creating a `NSDictionary` to save all namespaces:

{% highlight objective-c linenos %}
NSDictionary *namespaces = [NSDictionary dictionaryWithObjectsAndKeys:@"http://url/", @"ns1", nil];
{% endhighlight %}

Finally, Retrieving all data:

{% highlight objective-c linenos %}
NSArray *domesticFlights = [doc nodesForXPath:@"//ns1:FlightList/ns1:DomesticFlightData"
                                   namespaces:namespaces
                                        error:nil];
{% endhighlight %}
