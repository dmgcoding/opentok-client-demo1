import { useState } from "react";
import "./App.css";
import OT from "@opentok/client";

//demo windows

function App() {
  var apiKey = "47803511";
  var sessionId =
    "1_MX40NzgwMzUxMX5-MTY5OTMzNzM4MzU4Mn5SNUpTUm81elFxRjIzOHVxRlpKTTN0akJ-fn4";
  var token =
    "T1==cGFydG5lcl9pZD00NzgwMzUxMSZzaWc9NDY2ZTcyNWM3YWM0NDg1NGZjY2Y5NTkxYTRkODI1MjUyYjFmM2YzYjpzZXNzaW9uX2lkPTFfTVg0ME56Z3dNelV4TVg1LU1UWTVPVE16TnpNNE16VTRNbjVTTlVwVFVtODFlbEZ4UmpJek9IVnhSbHBLVFROMGFrSi1mbjQmY3JlYXRlX3RpbWU9MTY5OTMzOTE5OCZub25jZT0wLjg1MTQyNzQ4Mzg0ODUwMzYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY5OTQyNTU5NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

  useState(() => {
    initializeSession();
  }, []);

  function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    var publisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );

    session.connect(token, function (error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });

    session.on("streamCreated", function (event) {
      session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        handleError
      );
    });
  }

  return (
    <>
      <div id="videos">
        <div id="subscriber"></div>
        <div id="publisher"></div>
      </div>
    </>
  );
}

export default App;
