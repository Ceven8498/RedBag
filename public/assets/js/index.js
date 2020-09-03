console.log("tests2")

 $(function () {

    const form = $("#create-form")

    form.on("submit", function (event) {
        event.preventDefault()
        
        //const imageName = $("#name").val().trim()
        const file = $("#userImg")[0].files[0]
         const productName = $("#prodName").val().trim();
        const productDescription = $("#prodDescription").val().trim();
        // const productOwner = $("#prodOwner").val().trim();
        const productPrice = $("#prodPrice").val().trim();
        const productLocation = $("#prodLocation").val().trim();
        const productCondition = $("#prodCondition").val().trim();
        //console.log(file)

        const catValue = $("select[name='categoryPick']").val();
        const catName = $( "#categorySelection option:selected" ).text();

        const formData = new FormData
        formData.append("file", file)

        let userData = {
            image_name: "productName",
            product_name: productName,
            description: productDescription,
            category_id: catValue,
            // user_id: productOwner,
            price: productPrice,
            location: productLocation,
            condition: productCondition
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
            document.location.replace('/products/');
            console.log(result)
            return false
        })


    })
})