

const freshdeskValidation  = async (authInfo) => {
  console.log('authinfoooo---',authInfo);
      const response = await client.request.invokeTemplate("freshdeskValidation", {
        context: {
          host: authInfo.fd_domain,
          apiKey: authInfo.fd_apikey,
        },
      });
      return response;
    };
    

    
    function notify(message, type = "success") {
      var bgColor = type == "success" ? "#02b875" : "#DC161F";
    
      Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        backgroundColor: bgColor,
        position: "right",
        offset: {
          x: 70, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 20,
        },
        stopOnFocus: true,
      }).showToast();
    }
    function switchTab(position) {
      $("#tabs").attr("active-tab-index", position);
    }
    


