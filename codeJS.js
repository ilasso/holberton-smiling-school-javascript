function displayLoading(loading) {
  if (loading) {
      $("#purplequeote").wrap("<div class='loader'></div>")
  }
  else {
      $("#purplequeote").unwrap()
  }
} // displayLoading
function GetQuotes() {
  $.ajax({
    dataType:"json",
    beforeSend: displayLoading(true),
    contentType: "application/json",
    url:`https://smileschool-api.hbtn.info/quotes`,
    success:function(result){
      //$("#purplequeote").hide()
      $("#purplequeote").empty()
      displayLoading(false)
      result.forEach((item, i) => {
        console.log(i)
        if (!i) {
          $("#purplequeote").append(`
            <div class="carousel-item active">
              <div class="row d-flex justify-content-center">
                  <div class="col-lg-2">
                    <img src="${item.pic_url}" class="rounded-circle img-fluid" alt="slide">
                  </div>
                  <div class="col-lg-6 text-light">
                    <p>&lsaquo;&lsaquo;${item.text}&rsaquo;&rsaquo;</p>
                    <p class="font-weight-bold">${item.name}</p>
                    <p>Weather Presenter</p>
                  </div>
              </div>
            </div>
            `)
        } else {
          $("#purplequeote").append(`
            <div class="carousel-item">
              <div class="row d-flex justify-content-center">
                  <div class="col-lg-2">
                    <img src="${item.pic_url}" class="rounded-circle img-fluid" alt="slide">
                  </div>
                  <div class="col-lg-6 text-light">
                    <p>&lsaquo;&lsaquo;${item.text}&rsaquo;&rsaquo;</p>
                    <p class="font-weight-bold">${item.name}</p>
                    <p>Weather Presenter</p>
                  </div>
              </div>
            </div>
            `)
        }

        console.log("url2=" +item.pic_url)
        console.log("text2=" +item.text)
        console.log("name2=" +item.name)

      });

            /*result.query.search.forEach(function(row){
                        addNewArticle(row.pageid, row.title, row.snippet);
                    });*/
            }
  }); //ajax
}



$(document).ready(function(){
    GetQuotes();
});
