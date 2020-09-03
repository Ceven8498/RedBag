console.log("tests4")

async function ratingFormHanler(event) {

    // const form = $("#comment-form")

   // form.on("submit", function (event) {
        event.preventDefault()
        console.log("rating form handler");
        const commentText = $("#comment").val().trim()
        const url = (location.href).split('/')
        const id = url[url.length-1];
        console.log("URL ID is: ", id);
        const rating = document.getElementById("rating-input-1")

            var radioValue = $("input[name='rating-input-1']:checked").val();
            
                console.log("Your are a - " + radioValue);
            

        //console.log(file)

        const formData = new FormData
        //formData.append("file", file)

        //console.log("Our current session data from rating2.js is: ", req.session)
        let ratingData = {
            user_id: id,
            rating_value: radioValue,
            rating_comment: commentText
        }

        const rates =  JSON.stringify(ratingData);

        //console.log(formData.get("file"))
        console.log("Our lovely rating data: ", rates)
        const response = await fetch('/api/ratings/', {
            method: 'post',
            body: rates,
            headers: { 'Content-Type': 'application/json' }
          });

        // $.ajax({
        //     type: "POST",
        //     url: "/api/ratings",
        //     data: rates,
        //     contentType: false,
        //     processData: false
        // }).then(result => {
        //     document.location.redirect('/');
        //     console.log(result)
        //     return false
        // })

        location.reload();
    }
//     )
// })

document.getElementById("comment-form").addEventListener('submit', ratingFormHanler);