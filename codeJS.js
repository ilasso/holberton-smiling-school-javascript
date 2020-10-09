function displayLoading(loading, idelement) {
  if (loading) {
      $(idelement).wrap("<div class='loader'></div>")
  }
  else {
      $(idelement).unwrap()
  }
} // displayLoading

function BuiltQuote(numitem, item) {
  let active = ""
  if (!numitem) {
    active = "active"
  }
  $("#purplequeote").append(`
    <div class="carousel-item ${active}">
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
} // BuiltQuote

function BuiltpopularVideos(numitem, item) {
  let active = ""
  if (!numitem) {
    active = "active"
  }
  console.log(Object.keys(item))
  $("#popvideos").append(
          `<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${active}">
              <div class="card">
                  <div class="card-body">
                      <div class="">
                          <a class="play"><img class="img-fluid" src="${item.thumb_url}" alt="play" /></a>
                      </div>
                      <h5 class="card-title font-weight-bold">${item.title}</h5>
                      <p class="card-text">
                          <span>${item['sub-title']}</span>
                      </p>
                      <!-- VIDEO REVIEWER -->
                      <div class="row mb-3">
                          <div class="col-3 user_review">
                              <img class="rounded-circle img-fluid " src=${item.author_pic_url} alt=""/>
                          </div>
                          <div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
                              <span class="text-dark font-weight-bold">${item.author}</span>
                          </div>
                      </div>
                      <!-- VIDEO CALIFICATION -->
                      <div class="row text-center">
                          <div class="col-7">
                              <div class="d-flex justify-content-lg-center">
                                  <img class="img-fluid " src="./images/star_on.png" alt=""/>
                                  <img class="img-fluid " src="./images/star_on.png" alt=""/>
                                  <img class="img-fluid " src="./images/star_on.png" alt=""/>
                                  <img class="img-fluid " src="./images/star_on.png" alt=""/>
                                  <img class="img-fluid " src="./images/star_off.png" alt=""/>
                              </div>

                          </div>
                          <div class="col-5">
                              <span class="text-dark font-weight-bold">${item.duration}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
`);

}

function GetPopVideos() {
  $.ajax({
    dataType:"json",
    beforeSend: displayLoading(true,"#popvideos"),
    contentType: "application/json",
    url:`https://smileschool-api.hbtn.info/popular-tutorials`,
    success:function(result){
      $("#popvideos").empty()
      displayLoading(false,"#popvideos")
      result.forEach((item, i) => {
        console.log(item)
        BuiltpopularVideos(i, item)
      }); //forEach(
      }//success
    }); //ajax*/
}

function GetQuotes(){
  $.ajax({
    dataType:"json",
    beforeSend: displayLoading(true,"#purplequeote"),
    contentType: "application/json",
    url:`https://smileschool-api.hbtn.info/quotes`,
    success:function(result){
      $("#purplequeote").empty()
      displayLoading(false,"#purplequeote")
      result.forEach((item, i) => {
        BuiltQuote(i, item)
      }); //forEach(
      }//success
    }); //ajax*/
} // GetQuotes

$(document).ready(function(){
    GetQuotes();
    GetPopVideos();
});
