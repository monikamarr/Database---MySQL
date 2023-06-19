CS340 Project Readme
This readme provides an overview of the specifications and requirements for the CS340 Project. 
The project aims to create a web interface for data tables, primarily targeting database administrators.

Project Specifications
Database Pre-population: The project requires the database to be pre-populated with sample data. 
The sample data should demonstrate the functionality of each table, including the depiction of many-to-many relationships.

Entities and Relationships: The project should include at least four entities and four relationships. 
One of the relationships must be a many-to-many relationship. The entities and relationships should align 
with the operational requirements of the project.

Web Interface: The focus of the project is on creating a web interface for data tables. It is 
important to note that this is not a customer-facing website. Hence, features like login, sessions, 
registration, password management, shopping cart, check-out, etc., are not required.

Web Pages: The number of web app pages should correspond to the number of tables in the database. Each 
table should have a dedicated web page, except for a many-to-many relationship where both tables can be 
managed on a single web page. A home page can be optionally included.

Functionality: The project should implement various functionalities in the web interface, including:

Insert: The ability to insert entries into each table individually.
Select: Using SELECT queries to display the content of each table.
Update and Delete: Providing at least one update and one delete function for an entity. Additionally, 
the project should support adding and removing entries from a many-to-many relationship.
Dynamic Drop-down/Search: The web interface should utilize dynamically populated drop-down lists or 
enable text-based search for foreign keys, instead of requiring manual entry of IDs.
Optional Participation: If none of the one-to-many relationships in the database allow for optional 
participation, adjustments may be required to allow NULL values for one of the relationships. This will 
enable the ability to set the foreign key value to NULL using UPDATE, effectively removing the relationship.

Data Anomaly Handling: The project should handle data anomalies when deleting records from a many-to-many 
relationship. For example, deleting a customer should appropriately handle any associated orders. This can 
be achieved by setting the foreign key to NULL or deleting the associated records, following MySQL CASCADE principles.

Minimum Requirements: At a minimum, the project should implement 5 SELECTs, 5 INSERTs, 1 UPDATE (with a nullable relationship),
1 DELETE (many-to-many), and 1 Dynamic Drop-down/Search functionality, totaling 14 functions.
