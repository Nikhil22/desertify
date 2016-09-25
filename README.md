# desertify

<h2>What is it?</h2>

A service that allows a restaurant to optimize table space during hours of operation

<h2>Why?</h2>

Check out the motivation for desertify in this very short <a href="https://nikhilwins.wordpress.com/2016/09/25/desertify-a-service-that-allows-a-restaurant-to-optimize-table-space-during-hours-of-operation/" target="_blank">blog post</a>

<h2>Inputs</h2>
<ol>
	<li class="p1">
    The seating capacity of each table &amp; its quantity (i.e four 2-seaters, three 3-seaters, etc)
    <pre>
    /*
     * The key represents the seating capacity in terms of # of people
     * The value represents the quantity of the table
    */
    const tablesAvailableTemplate = {
      2: 4,
      3: 3,
      4: 2,
      5: 2
    }
    </pre>
  </li>
	<li class="p1">
  The average number of times per day each quantity of customers arrive (i.e groups of 4 arrive 15 times, groups of 2 arrive 20 times, etc)

  <pre>
  /*
   * The key represents the number of people in a group who enter a restaurant
   * The value represents the number of times a day a group of size [key] enters
  */
  const arrivalNumbersDaily = {
      1: 5,
      2: 20,
      3: 20,
      4: 15,
      5: 10
  }
  </pre>
  </li>
</ol>

<h2>This app uses</h2>
<ol>
  <li>ES6</li>
  <li>Node</li>
</ol>
