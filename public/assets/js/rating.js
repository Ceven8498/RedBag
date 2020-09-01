console.log("tests4")

 $(function () {

    const form = $("#comment-form")

    form.on("submit", function (event) {
        event.preventDefault()
        
        const commentText = $("#comment").val().trim()
        
        //console.log(file)

        const formData = new FormData
        //formData.append("file", file)

        let ratingData = {
            user_id: 1,
            rated_by: 2,
            rating_value: 3,
            rating_comment: commentText
        }

        const rates =  JSON.stringify(ratingData);

        //console.log(formData.get("file"))
        console.log("Our lovely rating data: ", rates)

        $.ajax({
            type: "POST",
            url: "/api/ratings",
            data: formData,
            contentType: false,
            processData: false
        }).then(result => {
            document.location.redirect('/');
            console.log(result)
            return false
        })


    })
})