var heart = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash");

Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('artist', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            // 'msg': msg,
            'heart':heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        // const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('artist', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            // 'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
