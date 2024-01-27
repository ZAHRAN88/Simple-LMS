// Fetch data from external JSON file
fetch('../courses.json')
  .then(response => response.json())
  .then(data => {
    // Get container element
    var popularCoursesRow = document.getElementById('popularCoursesRow');

    // Generate popular course items dynamically
    data.courses.forEach(course => {
      if (course.popular) {
        popularCoursesRow.innerHTML += generatePopularCourseItem(course);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to generate popular course item HTML
function generatePopularCourseItem(course) {
  return `
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
      <div class="course-item">
        <img src="${course.course_details.image}" class="img-fluid" alt="Course Image">
        <div class="course-content">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>${course.course_details.category}</h4>
            <p class="price">${course.course_details.course_fee}</p>
          </div>
          <h3><a href="course-details.html">${course.course_details.title}</a></h3>
          <p>${course.course_details.description}</p>
          <div class="trainer d-flex justify-content-between align-items-center">
            <div class="trainer-profile d-flex align-items-center">
              <img src="${course.course_details.trainerImage}" class="img-fluid" alt="Trainer Image">
              <span>${course.course_details.trainer}</span>
            </div>
            <div class="trainer-rank d-flex align-items-center">
              <i class="bx bx-user"></i>&nbsp;${50 - course.course_details.available_seats}
              &nbsp;&nbsp;
              <i class="bx bx-heart"></i>&nbsp;${course.course_details.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
