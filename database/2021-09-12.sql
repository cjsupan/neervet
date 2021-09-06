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

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date_and_time` datetime DEFAULT NULL,
  `notification` int(11) DEFAULT NULL,
  `complete` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 155 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 126 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: findings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `findings`;
CREATE TABLE `findings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_client_id` int(11) DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 74 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `complaint` varchar(500) DEFAULT NULL,
  `current_med` varchar(500) DEFAULT NULL,
  `physical_exam` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 73 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `laboratory`;
CREATE TABLE `laboratory` (
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
  `differential` varchar(500) DEFAULT NULL,
  `definitive` varchar(500) DEFAULT NULL,
  `treatment` varchar(500) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 62 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: systems
# ------------------------------------------------------------

DROP TABLE IF EXISTS `systems`;
CREATE TABLE `systems` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 75 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_level` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vitalsigns`;
CREATE TABLE `vitalsigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `temp` varchar(45) DEFAULT NULL,
  `respiratory_rate` varchar(45) DEFAULT NULL,
  `heart_rate` varchar(45) DEFAULT NULL,
  `crt` varchar(45) DEFAULT NULL,
  `mm` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 74 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------


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
    125,
    'Cedrick john',
    'Supan',
    'cedricksupan@yahoo.com',
    'pantar norte, balaoan la union',
    '09195452872',
    '2021-09-02 15:47:51',
    '2021-09-02 15:47:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: findings
# ------------------------------------------------------------

INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_client_id`,
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
    73,
    74,
    61,
    125,
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
    '2021-09-02 15:47:00',
    '2021-09-02 15:48:33'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: history
# ------------------------------------------------------------

INSERT INTO
  `history` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    72,
    61,
    125,
    '',
    '',
    '',
    '2021-09-02 15:47:00',
    '2021-09-02 15:48:33'
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
    `differential`,
    `definitive`,
    `treatment`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    69,
    57,
    94,
    'normal',
    'normal',
    'normal',
    'normal',
    'normal',
    'normal',
    'dasdassad',
    'asdasd',
    'dsadasd',
    'dasdasdasd',
    'dasdasdasdasd',
    'sdadasdasd',
    'asdasdasdasd',
    '',
    '2021-08-20 19:59:12',
    '2021-08-20 19:59:12'
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
    `differential`,
    `definitive`,
    `treatment`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    72,
    59,
    111,
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
    '',
    '',
    '',
    '2021-08-23 18:43:21',
    '2021-08-23 18:43:21'
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
    `differential`,
    `definitive`,
    `treatment`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    73,
    60,
    123,
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
    '',
    '',
    '',
    '2021-08-26 22:50:14',
    '2021-08-26 22:50:14'
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
    `differential`,
    `definitive`,
    `treatment`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    74,
    61,
    125,
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
    '',
    '',
    '',
    '2021-09-02 15:48:33',
    '2021-09-02 15:48:33'
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
    61,
    125,
    'Kali',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2019-03-18 00:00:00',
    '2021-09-02 15:47:00',
    '2021-09-02 15:48:33'
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
    74,
    61,
    125,
    'Ken oliver',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-09-02 15:47:00',
    '2021-09-02 15:48:33'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'Manero',
    'manero',
    'Manero',
    'Manero',
    'Subadmin',
    '2021-09-02 00:36:29',
    '2021-09-04 20:29:39'
  );
INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'cjsupan031899',
    '09055885986',
    'Cedrick john',
    'Supan',
    'Subadmin',
    '2021-09-02 00:39:20',
    '2021-09-02 00:39:20'
  );
INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'admin1',
    'asdasd',
    'Cedrick John',
    'Supan',
    'Subadmin',
    '2021-09-02 13:55:09',
    '2021-09-02 13:55:09'
  );
INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'Admin',
    'admin',
    'Cj',
    'Supan',
    'Admin',
    '2021-09-02 14:24:12',
    '2021-09-04 20:29:11'
  );
INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'manero031899',
    'manero031899',
    'Manero',
    'Manero',
    'Subadmin',
    '2021-09-06 23:42:47',
    '2021-09-06 23:42:47'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

INSERT INTO
  `vitalsigns` (
    `id`,
    `pet_id`,
    `pet_client_id`,
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
    73,
    61,
    125,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    '12',
    '2021-09-02 15:47:00',
    '2021-09-02 15:48:33'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
