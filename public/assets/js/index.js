console.log("tests2")

$(function () {

    const form = $("#create-form")

    form.on("submit", function (event) {
        event.preventDefault()
        
        const imageName = $("#name").val().trim()
        const file = $("#userImg")[0].files[0]

        //console.log(file)

        const formData = new FormData
        formData.append("file", file)

        let userData = {
            image_name: imageName
        }

        formData.append("data", JSON.stringify(userData))

        console.log(formData.get("file"))
        console.log(formData.get("data"))

        $.ajax({
            type: "post",
            url: "/api/products",
            data: formData,
            contentType: false,
            processData: false
        }).then(result => {
            console.log(result)
            return false
        })
    })
})