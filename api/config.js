module.exports = {

  "database": {
    "production": {
      "server": {
        "host": "https://dashdesk.azurewebsites.net",
        "port": "Default"
      },
      "host": "mongodb://dash2682:dash2682@ds056419.mlab.com:56419/dash",
      "username": "nothing",
      "password": "nothing"
    },
    "development": {
      "server": {
        "host": "http://localhost:666",
        "port": "6666"
      },
      "host": "mongodb://localhost:27017/dash",
      "username": "nothing",
      "password": "nothing"
    }
  },
  "accounts": {
    "office": {
      "credentials":  {
          "authority": "https://login.microsoftonline.com/common",
          "clientID": "d2d6267b-a005-4146-b79a-a754e5e0def3",
          "clientSecret": "wLPDOaGMOjWtGu9iUzsWsMcOLrXPwNG9uOdswFFQoj0=",
          "clientID_old" : "732617fd-15b7-4f14-9c8d-218e2cedfc45",
          "clientSecret_old": "dDkoENVioT3//Hh1Y79AO2rjIfSXkBljkswdKM3Vkg=",
          "redirectUri": "https://dashdesk.azurewebsites.net/callback"
      },
      "subscriptionConfiguration": {
          "ChangeType": "Created, Updated",
          "notificationUrl": "https://dashdesk.azurewebsites.net/listen",
          "notificationUrl_old": "https://dashdesk.azurewebsites.net/listen",
          "resource": "me/mailfolders(\\'Inbox\\')/messages',",
          "clientState": "cLIENTsTATEfORvALIDATION"
      }
    },
    "outlook": {
      "credentials": {
        "clientID": "35abf803-88f0-45fd-87a0-b4ff31069bd3",
        "clientSecret": "fje6VcOvnP2y9z7DHU3XCQY",
        "redirectUrls": [ "https://dashdesk.azurewebsites.net/callback",
                          "https://dashdesk.azurewebsites.net/",
                          "https://dashdesk.azurewebsites.net/listen"],
        "authority": "https://login.microsoftonline.com",
        "host": "https://outlook.office.com/api/v2.0/me/subscriptions/",
        "authorize_endpoint": "/common/oauth2/v2.0/authorize",
        "token_endpoint": "/common/oauth2/v2.0/token",
        "scope": "User.Read Mail.Send offline_access",
        "authUrl": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=35abf803-88f0-45fd-87a0-b4ff31069bd3&response_type=code&redirect_uri=https://dashdesk.azurewebsites.net/callback&scope=User.Read Mail.Read Mail.Send offline_access&response_mode=query&state=cLIENTsTATEfORvALIDATION",
        
        "docs1": "https://developer.microsoft.com/en-us/graph/docs/authorization/auth_register_app_v2",
        "docs2": "https://msdn.microsoft.com/en-us/office/office365/api/mail-rest-operations",
        "docs3": "https://msdn.microsoft.com/office/office365/APi/notify-rest-operations#authentication",
        "docs4": "https://dev.outlook.com/restapi/concepts/webhooks",

        "state": "cLIENTsTATEfORvALIDATION"
        
      },
      "subscriptionConfiguration": {
        // todo: use node http to simulate a client for the node-outlook client .
        "host": "https://graph.microsoft.com",
        "subscription_endpoint": "/v1.0/subscriptions/",
        "resource2": "https://outlook.office.com/api/v2.0/me/mailfolders('Drafts')/messages?$filter=HasAttachments%20eq%20true%20AND%20Importance%20eq%20%27High%27",
        "resource3": "https://outlook.office.com/api/v2.0/me/events",
        "resource": "https://graph.microsoft.com/me/mailfolders('inbox')/messages",
        "notificationUrl": "https://www.dash.azurewebsites.net/listen",
        "changeType": "Created, Updated",
        "clientState": "cLIENTsTATEfORvALIDATION",
        "@odata.type": "#Microsoft.OutlookServices.PushSubscription"

      }
    },
      "gmail": {
        "credentials": {
          "authUrl": "https://dashdesk.azurewebsites.net/auth/gmail",
          "clientID": "174293665341-aii1tth8tv3r706222ang4bfqajgma2f.apps.googleusercontent.com",
          "clientSecret": "tjD2bkDxvEhy-AGTxYRAqiGE",
          "redirectUri": "http://dashdesk.azurewebsites.net/calback/gmail/",
          "scopes": ['https://www.googleapis.com/auth/gmail.readonly']
          },
          "subscriptionConfiguration" : { }
    },
    "skype" : {
      "credentials": {

      },
      "subscriptionConfiguration" :{

      }
    }, 
    "yahoo": {
      "credentials": {

      },
      "subscriptionConfiguration" :{

      }
    },
    "evernote": {
      "credentials": {

      },
      "subscriptionConfiguration" :{

      }
    },
    "yammah": {
      "credentials": {

      },
      "subscriptionConfiguration" :{

      }
    }
  }
   
};