/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date_and_time` datetime DEFAULT NULL,
  `notification` int(11) DEFAULT NULL,
  `complete` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clients
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: findings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `findings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `general_appearance` varchar(500) DEFAULT NULL,
  `teeth_mouth` varchar(500) DEFAULT NULL,
  `eyes` varchar(500) DEFAULT NULL,
  `ears` varchar(500) DEFAULT NULL,
  `skin_coat` varchar(500) DEFAULT NULL,
  `heart_lungs` varchar(500) DEFAULT NULL,
  `digestive` varchar(500) DEFAULT NULL,
  `musculoskeletal` varchar(500) DEFAULT NULL,
  `nervous` varchar(500) DEFAULT NULL,
  `lymph` varchar(500) DEFAULT NULL,
  `urogenitals` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `complaint` varchar(500) DEFAULT NULL,
  `current_med` varchar(500) DEFAULT NULL,
  `physical_exam` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `laboratory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `heartworm` varchar(255) DEFAULT NULL,
  `skin_scrape` varchar(255) DEFAULT NULL,
  `ear_mites` varchar(255) DEFAULT NULL,
  `cdv` varchar(255) DEFAULT NULL,
  `cpv` varchar(255) DEFAULT NULL,
  `fiv` varchar(255) DEFAULT NULL,
  `vaginal_smear` varchar(500) DEFAULT NULL,
  `urinalysis` varchar(500) DEFAULT NULL,
  `fecalysis` varchar(500) DEFAULT NULL,
  `xray` varchar(500) DEFAULT NULL,
  `diagnosis_procedure` varchar(1000) DEFAULT NULL,
  `differential` varchar(500) DEFAULT NULL,
  `definitive` varchar(1000) DEFAULT NULL,
  `treatment` varchar(1000) DEFAULT NULL,
  `prescribed_med` varchar(1000) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pets
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `species` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `altered` varchar(45) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: systems
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `systems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `exam_vet` varchar(255) DEFAULT NULL,
  `general_appearance` varchar(45) DEFAULT NULL,
  `teeth_mouth` varchar(45) DEFAULT NULL,
  `eyes` varchar(45) DEFAULT NULL,
  `ears` varchar(45) DEFAULT NULL,
  `skin_coat` varchar(45) DEFAULT NULL,
  `heart_lungs` varchar(45) DEFAULT NULL,
  `digestive` varchar(45) DEFAULT NULL,
  `musculoskeletal` varchar(45) DEFAULT NULL,
  `nervous` varchar(45) DEFAULT NULL,
  `lymph` varchar(45) DEFAULT NULL,
  `urogenitals` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_level` varchar(45) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vitalsigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `temp` varchar(45) DEFAULT NULL,
  `respiratory_rate` varchar(45) DEFAULT NULL,
  `heart_rate` varchar(45) DEFAULT NULL,
  `crt` varchar(45) DEFAULT NULL,
  `mm` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

INSERT INTO
  `appointments` (
    `id`,
    `client_id`,
    `title`,
    `date_and_time`,
    `notification`,
    `complete`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    'Vaccination',
    '2021-09-14 20:14:00',
    1,
    0,
    '2021-09-13 19:58:55',
    '2021-09-13 19:58:55'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: clients
# ------------------------------------------------------------

INSERT INTO
  `clients` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `address`,
    `contact`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Cj',
    'Supan',
    'supancj18@gmail.com',
    'pantar norte, balaoan la union',
    '09195452872',
    '2021-09-18 18:29:15',
    '2021-09-18 18:29:15'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: findings
# ------------------------------------------------------------

INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    'nothing here',
    '',
    'nothing here',
    '',
    '',
    '',
    'nothing here',
    '',
    'nothing here',
    '',
    '',
    '2021-09-14 00:00:00',
    '2021-09-14 23:13:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: history
# ------------------------------------------------------------

INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    'INAPPETENCE FOR 2 DAYS; BLOODY DIARRHEA; VOMITION;  5% DEHYDRATION; ROUGH HAIR COAT; PALE MUCOUS MEMBRANE; BCS 1.5; HISTORY OF EXPOSURE TO SICK DOG 1 WEEK AGO; FEVER AT 39.5 c; HR 100 BPM; RR 15 BPM',
    'nothing here',
    'nothing here',
    '2021-09-14 00:00:00',
    '2021-09-14 23:13:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------

INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    'nothing here',
    'nothing here',
    'nothing here',
    'nothing here',
    'COMPLETE BLOOD COUNT (ANEMIA; THROMBOCYTOPENIA; NEUTROPHILIA); FECALYSIS (ANCYLOSTOMA CANINUM/ HOOKWORM EGGS); CPV TEST (+)',
    '',
    '',
    'HOSPITALIZATION FOR 5 DAYS; TOLFENAMIC ACID 0.5 MG/KG SC SID; TMPS 15MG/KG SC BID; I.V.PLACEMENT; RANITIDINE 4MG/KG IV BID; AMPICILLIN 50MG IV; IRON DEXTRAN 5 MG/KG; BLOOD TRANSFUSION',
    'SCOURVET PO BID; PET REBOOST 2 ML PO BID',
    'asdasdasd',
    '2021-09-14 23:13:22',
    '2021-09-14 23:13:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pets
# ------------------------------------------------------------

INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    'Kali',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2018-01-14 00:00:00',
    '2021-09-14 00:00:00',
    '2021-09-14 23:13:22'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: systems
# ------------------------------------------------------------

INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    'Ken oliver',
    'Abnormal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    '2021-09-01 10:00:00',
    '2021-09-15 22:53:29'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'admin',
    'admin',
    'Admin',
    'admin',
    'admin',
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'Cj',
    'Supan',
    'Staff',
    'cjsupan',
    'cjsupan',
    '2021-09-18 16:28:48',
    '2021-09-18 16:28:48'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    '5 kgs',
    '38.9',
    '12',
    '5',
    '1',
    '12',
    '2021-09-14 00:00:00',
    '2021-09-14 23:13:22'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
