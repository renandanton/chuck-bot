// https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template

module.exports = {
    message: function (data) {
        var template = {
            recipient: {
                id: data[0].recipientId
            },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: this.addElements(data)
                    }
                }
            }
        };
        
        return template;
    },
    
    addElements: function (data) {
        var elements = [];
        
        data.forEach( (element) => {
            var newElement = {
                title: element.title
            };
            
            if (element.subtitle) {
                newElement.subtitle = element.subtitle;
            }
            
            if (element.imageUrl) {
                newElement.image_url = element.imageUrl;
            }
            
            if (element.buttons) {
                newElement.buttons = this.addButtons(element.buttons);
            }
            
            elements.push(newElement);
        });
        
        return elements;
    },
    
    addButtons: function (buttons) {
        var arrayButtons = [];
        
        buttons.forEach( (button) => {
            var itemButton = {
                title: button.text                 
            };
             
            if (button.postback) {
                if (this.isUrl(button.postback)) {
                    itemButton.type = 'web_url';
                    itemButton.url = button.postback;
                    itemButton.messenger_extensions = true;
                    itemButton.webview_height_ratio = 'full';
                } else if (button.postback == 'element_share') {
                    itemButton.type = button.postback;
                } else {
                    itemButton.type = 'postback';
                    itemButton.payload = button.postback;
                }
            }
             
            arrayButtons.push(itemButton); 
         });
         
         return arrayButtons;
    }, 
    
    isUrl: function (string) {
        var regexp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        return regexp.test(string);
    }
};
