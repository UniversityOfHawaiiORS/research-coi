SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema coi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS coi DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE coi ;

-- -----------------------------------------------------
-- Table coi.investigator
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.investigator ;

CREATE TABLE IF NOT EXISTS coi.investigator (
  id INT NOT NULL,
  name VARCHAR(90) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.disclosure
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.disclosure ;

CREATE TABLE IF NOT EXISTS coi.disclosure (
  id INT NOT NULL,
  investigator_id INT NOT NULL,
  submitted_date DATETIME NULL,
  type VARCHAR(45) NULL,
  status VARCHAR(45) NULL,
  disposition VARCHAR(45) NULL,
  last_reviewed_date DATETIME NULL,
  expires DATETIME NULL,
  certified BINARY NULL,
  PRIMARY KEY (id),
  INDEX fk_disclosure_investigator_idx (investigator_id ASC),
  CONSTRAINT fk_disclosure_investigator
    FOREIGN KEY (investigator_id)
    REFERENCES coi.investigator (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.entity
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.entity ;

CREATE TABLE IF NOT EXISTS coi.entity (
  id INT NOT NULL,
  disclosure_id INT NOT NULL,
  investigator_id1 INT NOT NULL,
  name VARCHAR(45) NULL,
  status VARCHAR(45) NULL,
  type VARCHAR(45) NULL,
  public BINARY NULL,
  sponsor BINARY NULL,
  description VARCHAR(45) NULL,
  INDEX fk_entity_disclosure1_idx (disclosure_id ASC),
  PRIMARY KEY (id),
  INDEX fk_entity_investigator1_idx (investigator_id1 ASC),
  CONSTRAINT fk_entity_disclosure1
    FOREIGN KEY (disclosure_id)
    REFERENCES coi.disclosure (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_entity_investigator1
    FOREIGN KEY (investigator_id1)
    REFERENCES coi.investigator (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.declaration
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.declaration ;

CREATE TABLE IF NOT EXISTS coi.declaration (
  id INT NOT NULL,
  disclosure_id INT NOT NULL,
  entity_id INT NOT NULL,
  relationship VARCHAR(45) NULL,
  comment VARCHAR(1000) NULL,
  project_id INT NULL,
  PRIMARY KEY (id),
  INDEX fk_declaration_disclosure1_idx (disclosure_id ASC),
  INDEX fk_declaration_entity1_idx (entity_id ASC),
  CONSTRAINT fk_declaration_disclosure1
    FOREIGN KEY (disclosure_id)
    REFERENCES coi.disclosure (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_declaration_entity1
    FOREIGN KEY (entity_id)
    REFERENCES coi.entity (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.relationship
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.relationship ;

CREATE TABLE IF NOT EXISTS coi.relationship (
  id INT NOT NULL,
  entity_id INT NOT NULL,
  person VARCHAR(45) NULL,
  relationship VARCHAR(45) NULL,
  type VARCHAR(45) NULL,
  amount DECIMAL(2) NULL,
  comments VARCHAR(1000) NULL,
  INDEX fk_relationship_entity1_idx (entity_id ASC),
  PRIMARY KEY (id),
  CONSTRAINT fk_relationship_entity1
    FOREIGN KEY (entity_id)
    REFERENCES coi.entity (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.question_answer
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.question_answer ;

CREATE TABLE IF NOT EXISTS coi.question_answer (
  id INT NOT NULL,
  disclosure_id INT NOT NULL,
  value MEDIUMBLOB NULL,
  INDEX fk_question_answer_disclosure1_idx (disclosure_id ASC),
  PRIMARY KEY (id),
  CONSTRAINT fk_question_answer_disclosure1
    FOREIGN KEY (disclosure_id)
    REFERENCES coi.disclosure (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.reviewer
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.reviewer ;

CREATE TABLE IF NOT EXISTS coi.reviewer (
  id INT NOT NULL,
  disclosure_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_reviewer_disclosure1_idx (disclosure_id ASC),
  CONSTRAINT fk_reviewer_disclosure1
    FOREIGN KEY (disclosure_id)
    REFERENCES coi.disclosure (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.comment
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.comment ;

CREATE TABLE IF NOT EXISTS coi.comment (
  id INT NOT NULL,
  disclosure_id INT NOT NULL,
  author INT NOT NULL,
  time DATETIME NOT NULL,
  text VARCHAR(1000) NULL,
  PRIMARY KEY (id),
  INDEX fk_comment_disclosure1_idx (disclosure_id ASC),
  CONSTRAINT fk_comment_disclosure1
    FOREIGN KEY (disclosure_id)
    REFERENCES coi.disclosure (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.travel_event
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.travel_event ;

CREATE TABLE IF NOT EXISTS coi.travel_event (
  id INT NOT NULL,
  title VARCHAR(45) NULL,
  name VARCHAR(45) NULL,
  sponsor VARCHAR(45) NULL,
  destination VARCHAR(45) NULL,
  amount DECIMAL(2) NULL,
  purpose VARCHAR(45) NULL,
  start_date DATETIME NULL,
  end_date DATETIME NULL,
  declaration_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_travel_event_declaration1_idx (declaration_id ASC),
  CONSTRAINT fk_travel_event_declaration1
    FOREIGN KEY (declaration_id)
    REFERENCES coi.declaration (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.manual_event
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.manual_event ;

CREATE TABLE IF NOT EXISTS coi.manual_event (
  id INT NOT NULL,
  type VARCHAR(45) NULL,
  title VARCHAR(45) NULL,
  sponsor VARCHAR(45) NULL,
  role VARCHAR(45) NULL,
  amount DECIMAL(2) NULL,
  project_type VARCHAR(45) NULL,
  start_date DATETIME NULL,
  end_date DATETIME NULL,
  declaration_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_manual_event_declaration1_idx (declaration_id ASC),
  CONSTRAINT fk_manual_event_declaration1
    FOREIGN KEY (declaration_id)
    REFERENCES coi.declaration (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.configuration
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.configuration ;

CREATE TABLE IF NOT EXISTS coi.configuration (
  id INT NOT NULL,
  color1 CHAR(7) NOT NULL,
  color2 CHAR(7) NOT NULL,
  color3 CHAR(7) NOT NULL,
  color4 CHAR(7) NOT NULL,
  school VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_school (school ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.localized_string
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.localized_string ;

CREATE TABLE IF NOT EXISTS coi.localized_string (
  configuration_id INT NOT NULL,
  keyname VARCHAR(50) NOT NULL,
  value VARCHAR(45) NOT NULL,
  INDEX fk_string_configuration1_idx (configuration_id ASC),
  PRIMARY KEY (configuration_id, keyname),
  CONSTRAINT fk_string_configuration1
    FOREIGN KEY (configuration_id)
    REFERENCES coi.configuration (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table coi.questionnaire
-- -----------------------------------------------------
DROP TABLE IF EXISTS coi.questionnaire ;

CREATE TABLE IF NOT EXISTS coi.questionnaire (
  configuration_id INT NOT NULL,
  value MEDIUMBLOB NOT NULL,
  PRIMARY KEY (configuration_id),
  INDEX fk_question_configuration1_idx (configuration_id ASC),
  CONSTRAINT fk_question_configuration1
    FOREIGN KEY (configuration_id)
    REFERENCES coi.configuration (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
