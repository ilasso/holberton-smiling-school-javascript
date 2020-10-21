function displayLoading(loading, idelement) {
  if (loading) {
      $(idelement).wrap("<div class='loader'></div>")
  }
  else {
      $(idelement).unwrap()
  }
} // displayLoading

function BuiltTopic(result) {
  $("#topics").empty()
    console.log(result.topics);
  for (var i = 0; i < result.topics.length; i++) {
    console.log(result.topics[i])
    $("#topics").append(`<option value="${result.topics[i]}">${result.topics[i]}</option>`);

  }
  $("#sortby").empty()
  console.log(result.sorts);
  let sortwords
  for (var i = 0; i < result.sorts.length; i++) {
    sortwords = result.sorts[i].split("_")
    console.log(sortwords)
    console.log(result.sorts[i].length)
      $("#sortby").append(`<option value="${result.sorts[i]}">${sortwords[0]} ${sortwords[1]}</option>`);
  }
} // BuiltTopic

function GetCriteriaSearch() {
  $.ajax({
    dataType:"json",
    contentType: "application/json",
    url:`https://smileschool-api.hbtn.info/courses`,
    success:function(result){
        console.log(result)
        BuiltTopic(result)
      }//success
    }); //ajax*/
}

function BuiltContVideos(numitem, item, i ,length) {
  console.log("---BuiltContVideos----")
  console.log(item)
  console.log("-----Star-----")
  console.log(item.star)

  if (i === 0) {
    BuitQvideos(length)
  }
  //$("#cont_videos").prepend(`<label for="cont_videos" class="text-secondary mb-5">${item.length} Videos</label>`)
  $("#cont_videos").append(`
    <div class="col-md-3 col-sm-4 col-12 mb-5">
        <div class="card">
            <div class="card-body">
                <div class="">
                    <a class="play">
                        <img class="img-fluid" src="${item.thumb_url}"
                            alt="" />
                    </a>
                </div>
                <h5 class="card-title font-weight-bold">${item.title}</h5>
                <p class="card-text">
                    <span>${item['sub-title']}</span>
                </p>
                <!-- VIDEO REVIEWER -->
                <div class="row mb-3">
                    <div class="col-3 user_review">
                        <img class="rounded-circle img-fluid " src="${item.author_pic_url}"" />
                    </div>
                    <div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
                        <span class="highlight_text1 font-weight-bold">${item.author}</span>
                    </div>
                </div>
                <!-- VIDEO CALIFICATION -->
                <div class="row text-center">
                    <div class="col-7">
                        <div class="d-flex justify-content-lg-center">
                            <img class="img-fluid " src="./images/star_on.png" />
                            <img class="img-fluid " src="./images/star_on.png" />
                            <img class="img-fluid " src="./images/star_on.png" />
                            <img class="img-fluid " src="./images/star_on.png" />
                            <img class="img-fluid " src="./images/star_off.png" />
                        </div>

                    </div>
                    <div class="col-5">
                        <span class="highlight_text1 font-weight-bold">8 min</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)
}

function BuitQvideos(Q) {
  $("#Qvideos").remove()
  $("#idcourses").before(`<label id="Qvideos" class="text-secondary mb-5">${Q} Videos</label>`)
}

function GetCourseByCriteria(search, topic, sortBy) {
  let Qvideos = 0
  console.log("search=" + search)
  console.log("topic=" + topic)
  console.log("sortBy=" + sortBy)
    $("#cont_videos").empty()
    $.ajax({
    dataType:"json",
    contentType: "application/json",
    beforeSend: displayLoading(true,"#idcourses"),
    url:`https://smileschool-api.hbtn.info/courses?q=${search}&topic=${topic}&sortBy=${sortBy}`,
    success:function(result){
      //$("#cont_videos").empty()
      displayLoading(false,"#idcourses")
      console.log("resultado del search")
      console.log(result.courses)
      Qvideos = result.courses.length
      console.log("-----Qvideos---")
      console.log(Qvideos)
      for (var i = 0; i < result.courses.length; i++) {
          console.log("-------en foreach-------------")
          console.log(result.courses[i])

          BuiltContVideos(i, result.courses[i], i, result.courses.length)
        }//for
      }//success
    }); //ajax
    console.log("-----Qvideo222s---")
    console.log(Qvideos)
    if (!Qvideos) {
      BuitQvideos(0)
    }

} // GetCourseByCriteria

function ListenUserCriteria() {

    //search, topic, sortBy
    GetCourseByCriteria("", "all", "most_popular") //all records

    let txt = document.getElementById("Qvideos");
    txt.innerHTML = "";

    var selecttopics = document.getElementById('topics');
    selecttopics.addEventListener('change',
            function(){
                  var selectedOption = this.options[selecttopics.selectedIndex];
                  console.log(selectedOption.value + ': ' + selectedOption.text);
                  console.log("cambio  valor topics")
                  //search, topic, sortBy
                  GetCourseByCriteria(selectkeyword.value, selectedOption.value, selectsortby.value)
                  let txt = document.getElementById("Qvideos");
                  txt.innerHTML = "";
                  }
                );
    var selectsortby = document.getElementById('sortby');
    selectsortby.addEventListener('change',
            function(){
                  var selectedOption = this.options[selectsortby.selectedIndex];
                  console.log(selectedOption.value + ': ' + selectedOption.text);
                  console.log("cambio  valor sortby")
                  console.log(selecttopics.value)
                  //search, topic, sortBy
                  GetCourseByCriteria(selectkeyword.value, selecttopics.value, selectedOption.value)
                  let txt = document.getElementById("Qvideos");
                  txt.innerHTML = "";
                  }
                );

    var selectkeyword = document.getElementById('search');
    console.log(selectkeyword)
    selectkeyword.addEventListener('change',
            function(){
                  var selectedOption = this.value
                  console.log(selectkeyword.id + ': ' + selectedOption);
                  console.log("cambio  valor keyword")
                  //search, topic, sortBy
                  GetCourseByCriteria(selectedOption, selecttopics.value, selectsortby.value)
                  let txt = document.getElementById("Qvideos");
                  txt.innerHTML = "";
                  }
                );

    console.log(selecttopics.selectedIndex)
}

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

function BuiltpopularVideos(numitem, item, idelement) {
  let active = ""
  if (!numitem) {
    active = "active"
  }
  console.log(Object.keys(item))
  $(idelement).append(
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

function GetLatestVideos() {
  $.ajax({
    dataType:"json",
    beforeSend: displayLoading(true,"#latestvideos"),
    contentType: "application/json",
    url:`https://smileschool-api.hbtn.info/latest-videos`,
    success:function(result){
      $("#latestvideos").empty()
      displayLoading(false,"#latestvideos")
      result.forEach((item, i) => {
        console.log(item)
        BuiltpopularVideos(i, item, "#latestvideos")
      }); //forEach(
      }//success
    }); //ajax*/
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
        BuiltpopularVideos(i, item, "#popvideos")
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
    GetLatestVideos();
    GetCriteriaSearch();
    ListenUserCriteria()
});
