
fetch('../courses.json')
.then(response => response.json())
.then(data => {
 
  var courseDetailsRow = document.getElementById('courseDetailsRow');
  var courseTabs = document.getElementById('courseTabs');
  var courseTabsContent = document.getElementById('courseTabsContent');


  var selectedCourseTitle = localStorage.getItem('selectedCourse');

 
  var selectedCourse = data.courses.find(course => course.course_details.title === selectedCourseTitle);

  
  if (selectedCourse) {
   
    courseDetailsRow.innerHTML += generateCourseDetails(selectedCourse);

   
    courseTabs.innerHTML += generateCourseTabs(selectedCourse);

   
    courseTabsContent.innerHTML += generateTabContent(selectedCourse);
  } else {
    console.log('Selected course not found.');
  }
})
.catch(error => console.error('Error fetching data:', error));

/* ============================ course details  =========================== */ 
function generateCourseDetails(course) {
  return `
    <div class="col-lg-8">
      <img src="${course.course_details.image}" class="img-fluid" alt="">
      <h3>${course.course_details.title}</h3>
      <p>${course.course_details.description}</p>
    </div>
    <div class="col-lg-4">
      <div class="course-info d-flex justify-content-between align-items-center">
        <h5>Trainer</h5>
        <p><a href="#">${course.course_details.trainer}</a></p>
      </div>
      <div class="course-info d-flex justify-content-between align-items-center">
        <h5>Course Fee</h5>
        <p>${course.course_details.course_fee}</p>
      </div>
      <div class="course-info d-flex justify-content-between align-items-center">
        <h5>Available Seats</h5>
        <p>${course.course_details.available_seats}</p>
      </div>
      <div class="course-info d-flex justify-content-between align-items-center">
        <h5>Schedule</h5>
        <p>${course.course_details.schedule}</p>
      </div>
    </div>
  `;
}

/* ============================ course tabs  =========================== */ 

function generateCourseTabs(course) {
  var tabsHtml = "";
  course.course_details.tabs.forEach((tab, index) => {
    var activeClass = index === 0 ? "active show" : "";
    tabsHtml += `
      <li class="nav-item">
        <a class="nav-link ${activeClass}" data-bs-toggle="tab" href="#tab-${index + 1}">${tab.title}</a>
      </li>
    `;
  });
  return tabsHtml;
}

/* ============================ tab content  =========================== */
function generateTabContent(course) {
  var tabContentHtml = "";
  course.course_details.tabs.forEach((testimonial, index) => {
    var activeClass = index === 0 ? "active show" : "";
    tabContentHtml += `
      <div class="tab-pane ${activeClass}" id="tab-${index + 1}">
        <div class="row">
        <div class="col-lg-2 text-center order-1 order-lg-1">
        <img src="${testimonial.image}" alt="" class="img-fluid rounded-circle" style="width: 80px; height: 85px;" >
    </div>

          <div class="col-lg-10 details order-2 order-lg-1">
            <h3>${testimonial.title}</h3>
            <p class="fst-italic">${testimonial.content}</p>
          </div>
         
        </div>
      </div>
    `;
  });
  return tabContentHtml;
}
