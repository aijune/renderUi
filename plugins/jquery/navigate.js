define(["jquery"], function ($) {

    $.mobile = {};

    $.extend( $.mobile, {
        window: $( window ),
        document: $( document ),
        pushStateEnabled: true,
        hashListeningEnabled: true
    });

    $.extend( $.support, {
        pushState: "pushState" in history &&
            "replaceState" in history &&
            // When running inside a FF iframe, calling replaceState causes an error
            !( window.navigator.userAgent.indexOf( "Firefox" ) >= 0 && window.top !== window ) &&
            ( window.navigator.userAgent.search(/CriOS/) === -1 )
    });

    (function( $, undefined ) {
        var $win = $.mobile.window, self,
            dummyFnToInitNavigate = function() {
            };

        $.event.special.beforenavigate = {
            setup: function() {
                $win.on( "navigate", dummyFnToInitNavigate );
            },

            teardown: function() {
                $win.off( "navigate", dummyFnToInitNavigate );
            }
        };

        $.event.special.navigate = self = {
            bound: false,

            pushStateEnabled: true,

            originalEventName: undefined,

            // If pushstate support is present and push state support is defined to
            // be true on the mobile namespace.
            isPushStateEnabled: function() {
                return $.support.pushState &&
                    $.mobile.pushStateEnabled === true &&
                    this.isHashChangeEnabled();
            },

            // !! assumes mobile namespace is present
            isHashChangeEnabled: function() {
                return $.mobile.hashListeningEnabled === true;
            },

            // TODO a lot of duplication between popstate and hashchange
            popstate: function( event ) {
                var newEvent = new $.Event( "navigate" ),
                    beforeNavigate = new $.Event( "beforenavigate" ),
                    state = event.originalEvent.state || {};

                beforeNavigate.originalEvent = event;
                $win.trigger( beforeNavigate );

                if ( beforeNavigate.isDefaultPrevented() ) {
                    return;
                }

                if ( event.historyState ) {
                    $.extend(state, event.historyState);
                }

                // Make sure the original event is tracked for the end
                // user to inspect incase they want to do something special
                newEvent.originalEvent = event;

                // NOTE we let the current stack unwind because any assignment to
                //      location.hash will stop the world and run this event handler. By
                //      doing this we create a similar behavior to hashchange on hash
                //      assignment
                setTimeout(function() {
                    $win.trigger( newEvent, {
                        state: state
                    });
                }, 0);
            },

            hashchange: function( event /*, data */ ) {
                var newEvent = new $.Event( "navigate" ),
                    beforeNavigate = new $.Event( "beforenavigate" );

                beforeNavigate.originalEvent = event;
                $win.trigger( beforeNavigate );

                if ( beforeNavigate.isDefaultPrevented() ) {
                    return;
                }

                // Make sure the original event is tracked for the end
                // user to inspect incase they want to do something special
                newEvent.originalEvent = event;

                // Trigger the hashchange with state provided by the user
                // that altered the hash
                $win.trigger( newEvent, {
                    // Users that want to fully normalize the two events
                    // will need to do history management down the stack and
                    // add the state to the event before this binding is fired
                    // TODO consider allowing for the explicit addition of callbacks
                    //      to be fired before this value is set to avoid event timing issues
                    state: event.hashchangeState || {}
                });
            },

            // TODO We really only want to set this up once
            //      but I'm not clear if there's a beter way to achieve
            //      this with the jQuery special event structure
            setup: function( /* data, namespaces */ ) {
                if ( self.bound ) {
                    return;
                }

                self.bound = true;

                if ( self.isPushStateEnabled() ) {
                    self.originalEventName = "popstate";
                    $win.bind( "popstate.navigate", self.popstate );
                } else if ( self.isHashChangeEnabled() ) {
                    self.originalEventName = "hashchange";
                    $win.bind( "hashchange.navigate", self.hashchange );
                }
            }
        };
    })( jQuery );



    (function( $, undefined ) {
        var path, $base, dialogHashKey = "&ui-state=dialog";

        $.mobile.path = path = {
            uiStateKey: "&ui-state",

            // This scary looking regular expression parses an absolute URL or its relative
            // variants (protocol, site, document, query, and hash), into the various
            // components (protocol, host, path, query, fragment, etc that make up the
            // URL as well as some other commonly used sub-parts. When used with RegExp.exec()
            // or String.match, it parses the URL into a results array that looks like this:
            //
            //     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
            //     [1]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread
            //     [2]: http://jblas:password@mycompany.com:8080/mail/inbox
            //     [3]: http://jblas:password@mycompany.com:8080
            //     [4]: http:
            //     [5]: //
            //     [6]: jblas:password@mycompany.com:8080
            //     [7]: jblas:password
            //     [8]: jblas
            //     [9]: password
            //    [10]: mycompany.com:8080
            //    [11]: mycompany.com
            //    [12]: 8080
            //    [13]: /mail/inbox
            //    [14]: /mail/
            //    [15]: inbox
            //    [16]: ?msg=1234&type=unread
            //    [17]: #msg-content
            //
            urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,

            // Abstraction to address xss (Issue #4787) by removing the authority in
            // browsers that auto-decode it. All references to location.href should be
            // replaced with a call to this method so that it can be dealt with properly here
            getLocation: function( url ) {
                var parsedUrl = this.parseUrl( url || location.href ),
                    uri = url ? parsedUrl : location,

                    // Make sure to parse the url or the location object for the hash because using
                    // location.hash is autodecoded in firefox, the rest of the url should be from
                    // the object (location unless we're testing) to avoid the inclusion of the
                    // authority
                    hash = parsedUrl.hash;

                // mimic the browser with an empty string when the hash is empty
                hash = hash === "#" ? "" : hash;

                return uri.protocol +
                    parsedUrl.doubleSlash +
                    uri.host +

                    // The pathname must start with a slash if there's a protocol, because you
                    // can't have a protocol followed by a relative path. Also, it's impossible to
                    // calculate absolute URLs from relative ones if the absolute one doesn't have
                    // a leading "/".
                    ( ( uri.protocol !== "" && uri.pathname.substring( 0, 1 ) !== "/" ) ?
                        "/" : "" ) +
                    uri.pathname +
                    uri.search +
                    hash;
            },

            //return the original document url
            getDocumentUrl: function( asParsedObject ) {
                return asParsedObject ? $.extend( {}, path.documentUrl ) : path.documentUrl.href;
            },

            parseLocation: function() {
                return this.parseUrl( this.getLocation() );
            },

            //Parse a URL into a structure that allows easy access to
            //all of the URL components by name.
            parseUrl: function( url ) {
                // If we're passed an object, we'll assume that it is
                // a parsed url object and just return it back to the caller.
                if ( $.type( url ) === "object" ) {
                    return url;
                }

                var matches = path.urlParseRE.exec( url || "" ) || [];

                // Create an object that allows the caller to access the sub-matches
                // by name. Note that IE returns an empty string instead of undefined,
                // like all other browsers do, so we normalize everything so its consistent
                // no matter what browser we're running on.
                return {
                    href:         matches[  0 ] || "",
                    hrefNoHash:   matches[  1 ] || "",
                    hrefNoSearch: matches[  2 ] || "",
                    domain:       matches[  3 ] || "",
                    protocol:     matches[  4 ] || "",
                    doubleSlash:  matches[  5 ] || "",
                    authority:    matches[  6 ] || "",
                    username:     matches[  8 ] || "",
                    password:     matches[  9 ] || "",
                    host:         matches[ 10 ] || "",
                    hostname:     matches[ 11 ] || "",
                    port:         matches[ 12 ] || "",
                    pathname:     matches[ 13 ] || "",
                    directory:    matches[ 14 ] || "",
                    filename:     matches[ 15 ] || "",
                    search:       matches[ 16 ] || "",
                    hash:         matches[ 17 ] || ""
                };
            },

            //Turn relPath into an asbolute path. absPath is
            //an optional absolute path which describes what
            //relPath is relative to.
            makePathAbsolute: function( relPath, absPath ) {
                var absStack,
                    relStack,
                    i, d;

                if ( relPath && relPath.charAt( 0 ) === "/" ) {
                    return relPath;
                }

                relPath = relPath || "";
                absPath = absPath ? absPath.replace( /^\/|(\/[^\/]*|[^\/]+)$/g, "" ) : "";

                absStack = absPath ? absPath.split( "/" ) : [];
                relStack = relPath.split( "/" );

                for ( i = 0; i < relStack.length; i++ ) {
                    d = relStack[ i ];
                    switch ( d ) {
                        case ".":
                            break;
                        case "..":
                            if ( absStack.length ) {
                                absStack.pop();
                            }
                            break;
                        default:
                            absStack.push( d );
                            break;
                    }
                }
                return "/" + absStack.join( "/" );
            },

            //Returns true if both urls have the same domain.
            isSameDomain: function( absUrl1, absUrl2 ) {
                return path.parseUrl( absUrl1 ).domain.toLowerCase() ===
                    path.parseUrl( absUrl2 ).domain.toLowerCase();
            },

            //Returns true for any relative variant.
            isRelativeUrl: function( url ) {
                // All relative Url variants have one thing in common, no protocol.
                return path.parseUrl( url ).protocol === "";
            },

            //Returns true for an absolute url.
            isAbsoluteUrl: function( url ) {
                return path.parseUrl( url ).protocol !== "";
            },

            //Turn the specified realtive URL into an absolute one. This function
            //can handle all relative variants (protocol, site, document, query, fragment).
            makeUrlAbsolute: function( relUrl, absUrl ) {
                if ( !path.isRelativeUrl( relUrl ) ) {
                    return relUrl;
                }

                if ( absUrl === undefined ) {
                    absUrl = this.documentBase;
                }

                var relObj = path.parseUrl( relUrl ),
                    absObj = path.parseUrl( absUrl ),
                    protocol = relObj.protocol || absObj.protocol,
                    doubleSlash = relObj.protocol ? relObj.doubleSlash : ( relObj.doubleSlash || absObj.doubleSlash ),
                    authority = relObj.authority || absObj.authority,
                    hasPath = relObj.pathname !== "",
                    pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
                    search = relObj.search || ( !hasPath && absObj.search ) || "",
                    hash = relObj.hash;

                return protocol + doubleSlash + authority + pathname + search + hash;
            },

            //Add search (aka query) params to the specified url.
            addSearchParams: function( url, params ) {
                var u = path.parseUrl( url ),
                    p = ( typeof params === "object" ) ? $.param( params ) : params,
                    s = u.search || "?";
                return u.hrefNoSearch + s + ( s.charAt( s.length - 1 ) !== "?" ? "&" : "" ) + p + ( u.hash || "" );
            },

            convertUrlToDataUrl: function( absUrl ) {
                var result = absUrl,
                    u = path.parseUrl( absUrl );

                if ( path.isEmbeddedPage( u ) ) {
                    // For embedded pages, remove the dialog hash key as in getFilePath(),
                    // and remove otherwise the Data Url won't match the id of the embedded Page.
                    result = u.hash
                        .split( dialogHashKey )[0]
                        .replace( /^#/, "" )
                        .replace( /\?.*$/, "" );
                } else if ( path.isSameDomain( u, this.documentBase ) ) {
                    result = u.hrefNoHash.replace( this.documentBase.domain, "" ).split( dialogHashKey )[0];
                }

                return window.decodeURIComponent( result );
            },

            //get path from current hash, or from a file path
            get: function( newPath ) {
                if ( newPath === undefined ) {
                    newPath = path.parseLocation().hash;
                }
                return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, "" );
            },

            //set location hash to path
            set: function( path ) {
                location.hash = path;
            },

            //test if a given url (string) is a path
            //NOTE might be exceptionally naive
            isPath: function( url ) {
                return ( /\// ).test( url );
            },

            //return a url path with the window's location protocol/hostname/pathname removed
            clean: function( url ) {
                return url.replace( this.documentBase.domain, "" );
            },

            //just return the url without an initial #
            stripHash: function( url ) {
                return url.replace( /^#/, "" );
            },

            stripQueryParams: function( url ) {
                return url.replace( /\?.*$/, "" );
            },

            //remove the preceding hash, any query params, and dialog notations
            cleanHash: function( hash ) {
                return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
            },

            isHashValid: function( hash ) {
                return ( /^#[^#]+$/ ).test( hash );
            },

            //check whether a url is referencing the same domain, or an external domain or different protocol
            //could be mailto, etc
            isExternal: function( url ) {
                var u = path.parseUrl( url );

                return !!( u.protocol &&
                    ( u.domain.toLowerCase() !== this.documentUrl.domain.toLowerCase() ) );
            },

            hasProtocol: function( url ) {
                return ( /^(:?\w+:)/ ).test( url );
            },

            isEmbeddedPage: function( url ) {
                var u = path.parseUrl( url );

                //if the path is absolute, then we need to compare the url against
                //both the this.documentUrl and the documentBase. The main reason for this
                //is that links embedded within external documents will refer to the
                //application document, whereas links embedded within the application
                //document will be resolved against the document base.
                if ( u.protocol !== "" ) {
                    return ( !this.isPath(u.hash) && u.hash && ( u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ) ) );
                }
                return ( /^#/ ).test( u.href );
            },

            squash: function( url, resolutionUrl ) {
                var href, cleanedUrl, search, stateIndex, docUrl,
                    isPath = this.isPath( url ),
                    uri = this.parseUrl( url ),
                    preservedHash = uri.hash,
                    uiState = "";

                // produce a url against which we can resolve the provided path
                if ( !resolutionUrl ) {
                    if ( isPath ) {
                        resolutionUrl = path.getLocation();
                    } else {
                        docUrl = path.getDocumentUrl( true );
                        if ( path.isPath( docUrl.hash ) ) {
                            resolutionUrl = path.squash( docUrl.href );
                        } else {
                            resolutionUrl = docUrl.href;
                        }
                    }
                }

                // If the url is anything but a simple string, remove any preceding hash
                // eg #foo/bar -> foo/bar
                //    #foo -> #foo
                cleanedUrl = isPath ? path.stripHash( url ) : url;

                // If the url is a full url with a hash check if the parsed hash is a path
                // if it is, strip the #, and use it otherwise continue without change
                cleanedUrl = path.isPath( uri.hash ) ? path.stripHash( uri.hash ) : cleanedUrl;

                // Split the UI State keys off the href
                stateIndex = cleanedUrl.indexOf( this.uiStateKey );

                // store the ui state keys for use
                if ( stateIndex > -1 ) {
                    uiState = cleanedUrl.slice( stateIndex );
                    cleanedUrl = cleanedUrl.slice( 0, stateIndex );
                }

                // make the cleanedUrl absolute relative to the resolution url
                href = path.makeUrlAbsolute( cleanedUrl, resolutionUrl );

                // grab the search from the resolved url since parsing from
                // the passed url may not yield the correct result
                search = this.parseUrl( href ).search;

                // TODO all this crap is terrible, clean it up
                if ( isPath ) {
                    // reject the hash if it's a path or it's just a dialog key
                    if ( path.isPath( preservedHash ) || preservedHash.replace("#", "").indexOf( this.uiStateKey ) === 0) {
                        preservedHash = "";
                    }

                    // Append the UI State keys where it exists and it's been removed
                    // from the url
                    if ( uiState && preservedHash.indexOf( this.uiStateKey ) === -1) {
                        preservedHash += uiState;
                    }

                    // make sure that pound is on the front of the hash
                    if ( preservedHash.indexOf( "#" ) === -1 && preservedHash !== "" ) {
                        preservedHash = "#" + preservedHash;
                    }

                    // reconstruct each of the pieces with the new search string and hash
                    href = path.parseUrl( href );
                    href = href.protocol + href.doubleSlash + href.host + href.pathname + search +
                        preservedHash;
                } else {
                    href += href.indexOf( "#" ) > -1 ? uiState : "#" + uiState;
                }

                return href;
            },

            isPreservableHash: function( hash ) {
                return hash.replace( "#", "" ).indexOf( this.uiStateKey ) === 0;
            },

            // Escape weird characters in the hash if it is to be used as a selector
            hashToSelector: function( hash ) {
                var hasHash = ( hash.substring( 0, 1 ) === "#" );
                if ( hasHash ) {
                    hash = hash.substring( 1 );
                }
                return ( hasHash ? "#" : "" ) + hash.replace( /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1" );
            },

            // return the substring of a filepath before the dialogHashKey, for making a server
            // request
            getFilePath: function( path ) {
                return path && path.split( dialogHashKey )[0];
            },

            // check if the specified url refers to the first page in the main
            // application document.
            isFirstPageUrl: function( url ) {
                // We only deal with absolute paths.
                var u = path.parseUrl( path.makeUrlAbsolute( url, this.documentBase ) ),

                    // Does the url have the same path as the document?
                    samePath = u.hrefNoHash === this.documentUrl.hrefNoHash ||
                        ( this.documentBaseDiffers &&
                            u.hrefNoHash === this.documentBase.hrefNoHash ),

                    // Get the first page element.
                    fp = $.mobile.firstPage,

                    // Get the id of the first page element if it has one.
                    fpId = fp && fp[0] ? fp[0].id : undefined;

                // The url refers to the first page if the path matches the document and
                // it either has no hash value, or the hash is exactly equal to the id
                // of the first page element.
                return samePath &&
                    ( !u.hash ||
                        u.hash === "#" ||
                        ( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
            },

            // Some embedded browsers, like the web view in Phone Gap, allow
            // cross-domain XHR requests if the document doing the request was loaded
            // via the file:// protocol. This is usually to allow the application to
            // "phone home" and fetch app specific data. We normally let the browser
            // handle external/cross-domain urls, but if the allowCrossDomainPages
            // option is true, we will allow cross-domain http/https requests to go
            // through our page loading logic.
            isPermittedCrossDomainRequest: function( docUrl, reqUrl ) {
                return $.mobile.allowCrossDomainPages &&
                    (docUrl.protocol === "file:" || docUrl.protocol === "content:") &&
                    reqUrl.search( /^https?:/ ) !== -1;
            }
        };

        path.documentUrl = path.parseLocation();

        $base = $( "head" ).find( "base" );

        path.documentBase = $base.length ?
            path.parseUrl( path.makeUrlAbsolute( $base.attr( "href" ), path.documentUrl.href ) ) :
            path.documentUrl;

        path.documentBaseDiffers = (path.documentUrl.hrefNoHash !== path.documentBase.hrefNoHash);

        //return the original document base url
        path.getDocumentBase = function( asParsedObject ) {
            return asParsedObject ? $.extend( {}, path.documentBase ) : path.documentBase.href;
        };

        // DEPRECATED as of 1.4.0 - remove in 1.5.0
        $.extend( $.mobile, {

            //return the original document url
            getDocumentUrl: path.getDocumentUrl,

            //return the original document base url
            getDocumentBase: path.getDocumentBase
        });
    })( jQuery );



    (function( $, undefined ) {
        $.mobile.History = function( stack, index ) {
            this.stack = stack || [];
            this.activeIndex = index || 0;
        };

        $.extend($.mobile.History.prototype, {
            getActive: function() {
                return this.stack[ this.activeIndex ];
            },

            getLast: function() {
                return this.stack[ this.previousIndex ];
            },

            getNext: function() {
                return this.stack[ this.activeIndex + 1 ];
            },

            getPrev: function() {
                return this.stack[ this.activeIndex - 1 ];
            },

            // addNew is used whenever a new page is added
            add: function( url, data ) {
                data = data || {};

                //if there's forward history, wipe it
                if ( this.getNext() ) {
                    this.clearForward();
                }

                // if the hash is included in the data make sure the shape
                // is consistent for comparison
                if ( data.hash && data.hash.indexOf( "#" ) === -1) {
                    data.hash = "#" + data.hash;
                }

                data.url = url;
                this.stack.push( data );
                this.activeIndex = this.stack.length - 1;
            },

            //wipe urls ahead of active index
            clearForward: function() {
                this.stack = this.stack.slice( 0, this.activeIndex + 1 );
            },

            find: function( url, stack, earlyReturn ) {
                stack = stack || this.stack;

                var entry, i, length = stack.length, index;

                for ( i = 0; i < length; i++ ) {
                    entry = stack[i];

                    if ( decodeURIComponent(url) === decodeURIComponent(entry.url) ||
                        decodeURIComponent(url) === decodeURIComponent(entry.hash) ) {
                        index = i;

                        if ( earlyReturn ) {
                            return index;
                        }
                    }
                }

                return index;
            },

            closest: function( url ) {
                var closest, a = this.activeIndex;

                // First, take the slice of the history stack before the current index and search
                // for a url match. If one is found, we'll avoid avoid looking through forward history
                // NOTE the preference for backward history movement is driven by the fact that
                //      most mobile browsers only have a dedicated back button, and users rarely use
                //      the forward button in desktop browser anyhow
                closest = this.find( url, this.stack.slice(0, a) );

                // If nothing was found in backward history check forward. The `true`
                // value passed as the third parameter causes the find method to break
                // on the first match in the forward history slice. The starting index
                // of the slice must then be added to the result to get the element index
                // in the original history stack :( :(
                //
                // TODO this is hyper confusing and should be cleaned up (ugh so bad)
                if ( closest === undefined ) {
                    closest = this.find( url, this.stack.slice(a), true );
                    closest = closest === undefined ? closest : closest + a;
                }

                return closest;
            },

            direct: function( opts ) {
                var newActiveIndex = this.closest( opts.url ), a = this.activeIndex;

                // save new page index, null check to prevent falsey 0 result
                // record the previous index for reference
                if ( newActiveIndex !== undefined ) {
                    this.activeIndex = newActiveIndex;
                    this.previousIndex = a;
                }

                // invoke callbacks where appropriate
                //
                // TODO this is also convoluted and confusing
                if ( newActiveIndex < a ) {
                    ( opts.present || opts.back || $.noop )( this.getActive(), "back" );
                } else if ( newActiveIndex > a ) {
                    ( opts.present || opts.forward || $.noop )( this.getActive(), "forward" );
                } else if ( newActiveIndex === undefined && opts.missing ) {
                    opts.missing( this.getActive() );
                }
            }
        });
    })( jQuery );



    (function( $, undefined ) {
        var path = $.mobile.path,
            initialHref = location.href;

        $.mobile.Navigator = function( history ) {
            this.history = history;
            this.ignoreInitialHashChange = true;

            $.mobile.window.bind({
                "popstate.history": $.proxy( this.popstate, this ),
                "hashchange.history": $.proxy( this.hashchange, this )
            });
        };

        $.extend($.mobile.Navigator.prototype, {
            squash: function( url, data ) {
                var state, href, hash = path.isPath(url) ? path.stripHash(url) : url;

                href = path.squash( url );

                // make sure to provide this information when it isn't explicitly set in the
                // data object that was passed to the squash method
                state = $.extend({
                    hash: hash,
                    url: href
                }, data);

                // replace the current url with the new href and store the state
                // Note that in some cases we might be replacing an url with the
                // same url. We do this anyways because we need to make sure that
                // all of our history entries have a state object associated with
                // them. This allows us to work around the case where $.mobile.back()
                // is called to transition from an external page to an embedded page.
                // In that particular case, a hashchange event is *NOT* generated by the browser.
                // Ensuring each history entry has a state object means that onPopState()
                // will always trigger our hashchange callback even when a hashchange event
                // is not fired.
                window.history.replaceState( state, state.title || document.title, href );

                return state;
            },

            hash: function( url, href ) {
                var parsed, loc, hash, resolved;

                // Grab the hash for recording. If the passed url is a path
                // we used the parsed version of the squashed url to reconstruct,
                // otherwise we assume it's a hash and store it directly
                parsed = path.parseUrl( url );
                loc = path.parseLocation();

                if ( loc.pathname + loc.search === parsed.pathname + parsed.search ) {
                    // If the pathname and search of the passed url is identical to the current loc
                    // then we must use the hash. Otherwise there will be no event
                    // eg, url = "/foo/bar?baz#bang", location.href = "http://example.com/foo/bar?baz"
                    hash = parsed.hash ? parsed.hash : parsed.pathname + parsed.search;
                } else if ( path.isPath(url) ) {
                    resolved = path.parseUrl( href );
                    // If the passed url is a path, make it domain relative and remove any trailing hash
                    hash = resolved.pathname + resolved.search + (path.isPreservableHash( resolved.hash )? resolved.hash.replace( "#", "" ) : "");
                } else {
                    hash = url;
                }

                return hash;
            },

            // TODO reconsider name
            go: function( url, data, noEvents ) {
                var state, href, hash, popstateEvent,
                    isPopStateEvent = $.event.special.navigate.isPushStateEnabled();

                // Get the url as it would look squashed on to the current resolution url
                href = path.squash( url );

                // sort out what the hash sould be from the url
                hash = this.hash( url, href );

                // Here we prevent the next hash change or popstate event from doing any
                // history management. In the case of hashchange we don't swallow it
                // if there will be no hashchange fired (since that won't reset the value)
                // and will swallow the following hashchange
                if ( noEvents && hash !== path.stripHash(path.parseLocation().hash) ) {
                    this.preventNextHashChange = noEvents;
                }

                // IMPORTANT in the case where popstate is supported the event will be triggered
                //      directly, stopping further execution - ie, interupting the flow of this
                //      method call to fire bindings at this expression. Below the navigate method
                //      there is a binding to catch this event and stop its propagation.
                //
                //      We then trigger a new popstate event on the window with a null state
                //      so that the navigate events can conclude their work properly
                //
                // if the url is a path we want to preserve the query params that are available on
                // the current url.
                this.preventHashAssignPopState = true;
                window.location.hash = hash;

                // If popstate is enabled and the browser triggers `popstate` events when the hash
                // is set (this often happens immediately in browsers like Chrome), then the
                // this flag will be set to false already. If it's a browser that does not trigger
                // a `popstate` on hash assignement or `replaceState` then we need avoid the branch
                // that swallows the event created by the popstate generated by the hash assignment
                // At the time of this writing this happens with Opera 12 and some version of IE
                this.preventHashAssignPopState = false;

                state = $.extend({
                    url: href,
                    hash: hash,
                    title: document.title
                }, data);

                if ( isPopStateEvent ) {
                    popstateEvent = new $.Event( "popstate" );
                    popstateEvent.originalEvent = {
                        type: "popstate",
                        state: null
                    };

                    this.squash( url, state );

                    // Trigger a new faux popstate event to replace the one that we
                    // caught that was triggered by the hash setting above.
                    if ( !noEvents ) {
                        this.ignorePopState = true;
                        $.mobile.window.trigger( popstateEvent );
                    }
                }

                // record the history entry so that the information can be included
                // in hashchange event driven navigate events in a similar fashion to
                // the state that's provided by popstate
                this.history.add( state.url, state );
            },

            // This binding is intended to catch the popstate events that are fired
            // when execution of the `$.navigate` method stops at window.location.hash = url;
            // and completely prevent them from propagating. The popstate event will then be
            // retriggered after execution resumes
            //
            // TODO grab the original event here and use it for the synthetic event in the
            //      second half of the navigate execution that will follow this binding
            popstate: function( event ) {
                var hash, state;

                // Partly to support our test suite which manually alters the support
                // value to test hashchange. Partly to prevent all around weirdness
                if ( !$.event.special.navigate.isPushStateEnabled() ) {
                    return;
                }

                // If this is the popstate triggered by the actual alteration of the hash
                // prevent it completely. History is tracked manually
                if ( this.preventHashAssignPopState ) {
                    this.preventHashAssignPopState = false;
                    event.stopImmediatePropagation();
                    return;
                }

                // if this is the popstate triggered after the `replaceState` call in the go
                // method, then simply ignore it. The history entry has already been captured
                if ( this.ignorePopState ) {
                    this.ignorePopState = false;
                    return;
                }

                // If there is no state, and the history stack length is one were
                // probably getting the page load popstate fired by browsers like chrome
                // avoid it and set the one time flag to false.
                // TODO: Do we really need all these conditions? Comparing location hrefs
                // should be sufficient.
                if ( !event.originalEvent.state &&
                    this.history.stack.length === 1 &&
                    this.ignoreInitialHashChange ) {
                    this.ignoreInitialHashChange = false;

                    if ( location.href === initialHref ) {
                        event.preventDefault();
                        return;
                    }
                }

                // account for direct manipulation of the hash. That is, we will receive a popstate
                // when the hash is changed by assignment, and it won't have a state associated. We
                // then need to squash the hash. See below for handling of hash assignment that
                // matches an existing history entry
                // TODO it might be better to only add to the history stack
                //      when the hash is adjacent to the active history entry
                hash = path.parseLocation().hash;
                if ( !event.originalEvent.state && hash ) {
                    // squash the hash that's been assigned on the URL with replaceState
                    // also grab the resulting state object for storage
                    state = this.squash( hash );

                    // record the new hash as an additional history entry
                    // to match the browser's treatment of hash assignment
                    this.history.add( state.url, state );

                    // pass the newly created state information
                    // along with the event
                    event.historyState = state;

                    // do not alter history, we've added a new history entry
                    // so we know where we are
                    return;
                }

                // If all else fails this is a popstate that comes from the back or forward buttons
                // make sure to set the state of our history stack properly, and record the directionality
                this.history.direct({
                    url: (event.originalEvent.state || {}).url || hash,

                    // When the url is either forward or backward in history include the entry
                    // as data on the event object for merging as data in the navigate event
                    present: function( historyEntry, direction ) {
                        // make sure to create a new object to pass down as the navigate event data
                        event.historyState = $.extend({}, historyEntry);
                        event.historyState.direction = direction;
                    }
                });
            },

            // NOTE must bind before `navigate` special event hashchange binding otherwise the
            //      navigation data won't be attached to the hashchange event in time for those
            //      bindings to attach it to the `navigate` special event
            // TODO add a check here that `hashchange.navigate` is bound already otherwise it's
            //      broken (exception?)
            hashchange: function( event ) {
                var history, hash;

                // If hashchange listening is explicitly disabled or pushstate is supported
                // avoid making use of the hashchange handler.
                if (!$.event.special.navigate.isHashChangeEnabled() ||
                    $.event.special.navigate.isPushStateEnabled() ) {
                    return;
                }

                // On occasion explicitly want to prevent the next hash from propogating because we only
                // with to alter the url to represent the new state do so here
                if ( this.preventNextHashChange ) {
                    this.preventNextHashChange = false;
                    event.stopImmediatePropagation();
                    return;
                }

                history = this.history;
                hash = path.parseLocation().hash;

                // If this is a hashchange caused by the back or forward button
                // make sure to set the state of our history stack properly
                this.history.direct({
                    url: hash,

                    // When the url is either forward or backward in history include the entry
                    // as data on the event object for merging as data in the navigate event
                    present: function( historyEntry, direction ) {
                        // make sure to create a new object to pass down as the navigate event data
                        event.hashchangeState = $.extend({}, historyEntry);
                        event.hashchangeState.direction = direction;
                    },

                    // When we don't find a hash in our history clearly we're aiming to go there
                    // record the entry as new for future traversal
                    //
                    // NOTE it's not entirely clear that this is the right thing to do given that we
                    //      can't know the users intention. It might be better to explicitly _not_
                    //      support location.hash assignment in preference to $.navigate calls
                    // TODO first arg to add should be the href, but it causes issues in identifying
                    //      embeded pages
                    missing: function() {
                        history.add( hash, {
                            hash: hash,
                            title: document.title
                        });
                    }
                });
            }
        });
    })( jQuery );



    (function( $, undefined ) {
        // TODO consider queueing navigation activity until previous activities have completed
        //      so that end users don't have to think about it. Punting for now
        // TODO !! move the event bindings into callbacks on the navigate event
        $.mobile.navigate = function( url, data, noEvents ) {
            $.mobile.navigate.navigator.go( url, data, noEvents );
        };

        // expose the history on the navigate method in anticipation of full integration with
        // existing navigation functionalty that is tightly coupled to the history information
        $.mobile.navigate.history = new $.mobile.History();

        // instantiate an instance of the navigator for use within the $.navigate method
        $.mobile.navigate.navigator = new $.mobile.Navigator( $.mobile.navigate.history );

        var loc = $.mobile.path.parseLocation();
        $.mobile.navigate.history.add( loc.href, {hash: loc.hash} );
    })( jQuery );


});
