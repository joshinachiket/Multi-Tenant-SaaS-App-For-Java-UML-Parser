use tenant_database;

RENAME TABLE tenant_one_info TO tenant_common_data;

CREATE TABLE 
tenant_common_data (tenant_id VARCHAR(3),
				tenant_name VARCHAR(20));
                
CREATE TABLE 
tenant_specific_data ( grade_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
				tenant_id VARCHAR(3),
				correct VARCHAR(10), 
                marks VARCHAR(2),
                comment VARCHAR(20));
                
desc tenant_common_data;
desc tenant_specific_data;

select * from tenant_common_data;
select * from tenant_specific_data;


DROP table tenant_common_data;
DROP table tenant_specific_data;

INSERT INTO tenant_common_data (tenant_id, tenant_name)  
VALUES (101, "Tenant-1 Akshay");

INSERT INTO tenant_common_data (tenant_id, tenant_name)  
VALUES (102, "Tenant-2 Laura");

INSERT INTO tenant_common_data (tenant_id, tenant_name)  
VALUES (103, "Tenant-3 Suchi");

INSERT INTO tenant_common_data (tenant_id, tenant_name)  
VALUES (104, "Tenant-4 Apoorva");

INSERT INTO tenant_specific_data (grade_id, tenant_id, correct, marks, comment)  
VALUES (100000, "101", "YES", 10, "Awesome work");


ALTER TABLE tenant_specific_data
DROP grade;
