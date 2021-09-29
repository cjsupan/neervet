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
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
    2,
    2,
    'Vaccination',
    '2021-09-30 18:34:00',
    0,
    0,
    '2021-09-23 11:58:39',
    '2021-09-23 11:58:39'
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
    2,
    'Cj',
    'Supan',
    'supancj18@gmail.com',
    'pantar norte, balaoan la union',
    '09352909072',
    '2021-09-21 19:31:24',
    '2021-09-21 19:31:24'
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
    15,
    15,
    8,
    2,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-09-23 16:38:00',
    '2021-09-23 16:38:27'
  );
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
    16,
    16,
    8,
    2,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-09-23 16:46:00',
    '2021-09-23 16:46:56'
  );
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
    17,
    17,
    9,
    2,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-09-23 00:00:00',
    '2021-09-23 16:49:44'
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
    15,
    15,
    8,
    2,
    'something',
    'something',
    'something',
    '2021-09-23 16:38:00',
    '2021-09-23 16:38:27'
  );
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
    16,
    16,
    8,
    2,
    'something here',
    'something here',
    'something here',
    '2021-09-23 16:46:00',
    '2021-09-23 16:46:56'
  );
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
    17,
    17,
    9,
    2,
    'something here',
    'something here',
    'something here',
    '2021-09-23 00:00:00',
    '2021-09-23 16:49:44'
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
    12,
    12,
    7,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-09-21 18:19:02',
    '2021-09-21 18:19:02'
  );
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
    15,
    15,
    8,
    2,
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Not Ready',
    'Negative',
    'Negative',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-09-23 16:38:27',
    '2021-09-23 16:38:27'
  );
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
    16,
    16,
    8,
    2,
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Not Ready',
    'Negative',
    'Negative',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-09-23 16:46:56',
    '2021-09-23 16:46:56'
  );
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
    17,
    17,
    9,
    2,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-09-23 16:49:44',
    '2021-09-23 16:49:44'
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
    8,
    2,
    'Kali',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2018-01-23 00:00:00',
    '2021-09-21 00:00:00',
    '2021-09-21 19:32:01'
  );
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
    9,
    2,
    'Cupper',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2019-06-23 00:00:00',
    '2021-09-23 00:00:00',
    '2021-09-23 16:49:44'
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
    15,
    8,
    2,
    'Doc willie ong',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-09-23 16:43:00',
    '2021-09-23 16:43:14'
  );
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
    16,
    8,
    2,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-09-20 16:47:00',
    '2021-09-23 16:47:06'
  );
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
    17,
    9,
    2,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-09-23 00:00:00',
    '2021-09-23 16:49:44'
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
    'Admin',
    'Admin',
    'Admin',
    'admin',
    'admin',
    NULL,
    '2021-09-29 15:43:33'
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
    'Marie ann',
    'Fontanilla',
    'Admin',
    'maan',
    'maan',
    '2021-09-21 14:15:23',
    '2021-09-21 14:15:23'
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
    7,
    'Cedrick John',
    'Supan',
    'Staff',
    'cjsupan',
    'cjsupan',
    '2021-09-29 18:25:24',
    '2021-09-29 18:25:24'
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
    15,
    15,
    8,
    2,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    'pale',
    '2021-09-23 16:38:00',
    '2021-09-23 16:38:27'
  );
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
    16,
    16,
    8,
    2,
    '15',
    '38.9',
    '12',
    '7',
    '3',
    'pale',
    '2021-09-23 16:46:00',
    '2021-09-23 16:46:56'
  );
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
    17,
    17,
    9,
    2,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    'pale',
    '2021-09-23 00:00:00',
    '2021-09-23 16:49:44'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
