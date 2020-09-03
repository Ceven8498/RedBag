console.log("tests4")

async function deleteProduct(event) {
        event.preventDefault()
        console.log("deleting product...");
        const url = (location.href).split('/')
        const id = url[url.length-1];
        console.log("URL ID is: ", id);

        let productData = {
            product_id: id
        }

        const productId =  JSON.stringify(productData);
        console.log(productId);
        // const response = await fetch('/api/products/', {
        //     method: 'delete',
        //     body: productId,
        //     headers: { 'Content-Type': 'application/json' }
        //   });

        $.ajax({
            type: "DELETE",
            url: "/api/products/" + id,
            data: productId,
            contentType: false,
            processData: false
        }).then(result => {
            console.log(result)
            return false
        })


    }
//     )
// })

document.getElementById("delete").addEventListener('click', deleteProduct);