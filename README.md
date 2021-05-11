<h1>Client for Table Tempo, a Restaurant Waitlist App</h1>
<p>Table Tempo is a compact web app for managing waitlists in real time, targeted towards small to medium sized restaurants who are implementing "first come, first served" seating arrangements.
The app's primary user would be restaurants and their staff, as it allows them to add parties to a running timed waitlist. The waitlist is ordered by estimated seating time given to the table,
with seated tables moved to the bottom of the list out of sight. It allows hosts to store information about incoming parties in a compact format, and use visual cues to rapidly determine
if a party has been waiting longer than expected.
</p>
<p>The app allows Admin accounts to manage other staff accounts and set permissions for those staff. The reports page allows restaurants to view previous parties by a range of dates, or search for a specific
party by name to view their visit information. An Admin can see if a party left before being seated, as well compare the estimated wait given to a table to the actual wait until they were seated. Tables who have left before being seated are also tagged and tracked.</p>

<h2>Dependencies and Libraries</h2>
<p>The Client side of this app is built with React & Typescript. Material-UI's React library was used for some basic components, such as Menus and Input Fields. React-Router-Dom was added for single-page routing, and react-datepicker for a date selection interface. Dayjs() was the time management library used for the many time management functions in the app.</p>

<p>Data is stored on three Postgres tables: Restaurants, Staff, and Parties. One restaurant account has many staff, and each staff has many Parties.</p>

<h2>User Experience</h2>
<p>The primary waitlist page of the app features a party creation form, and then a display of all the current parties. For the waitlist viewable parties are reset at 5am, so that a given business day may include parties from 5am until 4:59am the next day. Once a party is added via the create form it is loaded into the list by order of Estimated Wait Time (not order of arrival). Parties start blue in color for "ok" status. If a party has been waiting longer than their estimated wait time, it changes color to yellow for "overdue" status for immediately visual signaling to staff. If either "seated" or "left" option is selected for a party, it moves to the bottom of the list and is made colorless, so that the information is still accessable but it's out of immediate sight. If the "edit" button is selected for any party that single party is re-rendered as editable and updatable without leaving the waitlist display. In future versions staff will be able to send an automated "Your table is ready" text to guests from within this waitlist display.</p>
<p>The Reports page can display a list of parties for a range of dates, and has a separate search function that can search the party name field for a specific string. It uses the timeArrived, timeEstimated, and timeSeated date objects to calculate each parties wait times.</p>
<p>The Admin page is only accessible to those staff who are registered as "admin" in the database, with permissions stored in a JSONToken. "Admin" status gives access to a list of staff registered to this restaurant account. The staff account that matches the original restaurant account registration email has its permissions locked, so that a user cannot accidentally make their main account a non-admin and thus lock themselves out of all admin features in the app. For other users, the admin can change the "admin" and "active" permissions (active permission to be utilized in future versions). Within the admin page each restaurant has a custom link to give new employees to register their staff accounts. The link contains a randomly generated UUID code associated with the restaurant that ensures staff accounts are properly connected.</p>


  
<h2>Future Features</h2>
<p>Version 2.0 of Table Tempo will add integration with Twillio's text messaging API. Party phone numbers are already stored in a Twilio friendly format for easy implementation of that feature.</p>

<p>Other features for version 2.0:</p>
<ul>
  <li>Average Wait Time for Parties in Date Range</li>
  <li>Average Estimated Time for Parties in Date Range</li>
  <li>Total Tables that left in Date Range</li>
  <li>Line Graph show changes in Wait Time/Estimated Wait over time</li>
  <li>Search parties by telephone number</li>
  <li>Pagination for Longer Party Reports</li>
 </ul>
 
<h2>Table Tempo Server Side Repo</h2>
<a href="https://github.com/gingeralford/TableTempoServer">Table Tempo Server Github</a>
<h2>Table Tempo Live Deployment on Heroku</h2>
<a href="http://table-tempo.herokuapp.com/">Table Tempo</a>
