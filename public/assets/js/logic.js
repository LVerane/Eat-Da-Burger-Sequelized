// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");

    var customer = $(`#nc${id}`)
      .val()
      .trim();
    console.log(customer);
    if (customer === "") {
      customer = "Anonymous";
    }
    console.log(customer);
    $.ajax("/api/customer/" + customer, {
      type: "GET"
    }).then(function(data) {
      if (data === null) {
        // console.log("SOMETHING");
        // console.log(data);
        $.ajax("/api/customer", {
          type: "POST",
          data: {
            customer: customer
          }
        }).then(function() {
          // Reload the page to get the updated list
          location.reload();
        });
      } else {
        $.ajax("/api/customer/" + customer, {
          type: "PUT",
          data: {
            burgersEaten: data.burgersEaten + 1
          }
        }).then(function() {
          // Reload the page to get the updated list
          location.reload();
        });
      }
    });

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {
        devoured: true,
        toGo: false
      }
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".togo").on("click", function(event) {
    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {
        devoured: false,
        toGo: false
      }
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".order-another").on("click", function(event) {
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "GET"
    }).then(function(data) {
      console.log(data);
      $.ajax("/api/burgers", {
        type: "POST",
        data: {
          burger: data.burger,
          toGo: $("[name=toGo]:checked")
            .val()
            .trim()
        }
      }).then(function() {
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: {
        burger: $("#nb")
          .val()
          .trim(),
        toGo: $("[name=toGo]:checked")
          .val()
          .trim()
      }
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
