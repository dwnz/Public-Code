// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize


                var trademeInstance = new TradmeOAuth(Trademe.OAuth.Config.consumerKey, Trademe.OAuth.Config.consumerSecret);

                var errMsg, dialog;

                trademeInstance.doTrademeWebAuth(function (trademeUserInfo) {
                    if (trademeUserInfo) {
                        /* 
                        The OAuth instance is automatically updated with the access token info we were just granted.
                        This allows us to make signed requests on the users behalf.  These keys are
                        permanent unless revoked by the user, so in your app you'll probably want to store them for
                        future requests. 
                        */

                        //Output the tokens as well just for reference
                        //accessTokensNode.innerHTML = JSON.stringify(trademeUserInfo);
                        //accessTokensNode.className = ''; //show it


                    } else {
                        errMsg = 'Trademe authentication failed or was cancelled!';
                        dialog = Windows.UI.Popups.MessageDialog(errMsg);
                        dialog.showAsync();
                    }
                });

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
