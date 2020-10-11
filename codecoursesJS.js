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

function BuiltContVideos(numitem, item) {
  console.log("---BuiltContVideos----")
  console.log(item)
  console.log("-----Star-----")
  console.log(item.star)
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

function GetCourseByCriteria(search, topic, sortBy) {
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

      for (var i = 0; i < result.courses.length; i++) {
          console.log("-------en foreach-------------")
          console.log(result.courses[i])
          BuiltContVideos(i, result.courses[i])
        }//for
      }//success
    }); //ajax
} // GetCourseByCriteria

function ListenUserCriteria() {
    //search, topic, sortBy
    GetCourseByCriteria("", "all", "most_popular") //all records
    var selecttopics = document.getElementById('topics');
    selecttopics.addEventListener('change',
            function(){
                  var selectedOption = this.options[selecttopics.selectedIndex];
                  console.log(selectedOption.value + ': ' + selectedOption.text);
                  console.log("cambio  valor topics")
                  //search, topic, sortBy
                  GetCourseByCriteria(selectkeyword.value, selectedOption.value, selectsortby.value)
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
                  }
                );

    console.log(selecttopics.selectedIndex)
}

$(document).ready(function(){
    GetCriteriaSearch();
    ListenUserCriteria()
    //https://smileschool-api.hbtn.info/courses?q=${search}&topic=${topic}&sortBy=${sortBy}`,
});
