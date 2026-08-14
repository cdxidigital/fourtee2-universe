CREATE TABLE `destinationFieldNotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`city` varchar(120) NOT NULL,
	`country` varchar(120) NOT NULL,
	`latitude` varchar(32) NOT NULL,
	`longitude` varchar(32) NOT NULL,
	`note` text NOT NULL,
	`imageUrl` varchar(1024),
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `destinationFieldNotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `savedSignals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`signalType` enum('destination','playlist') NOT NULL,
	`portal` enum('travel','music','you') NOT NULL,
	`sourceId` varchar(128) NOT NULL,
	`title` varchar(180) NOT NULL,
	`subtitle` varchar(255),
	`href` varchar(1024),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `savedSignals_id` PRIMARY KEY(`id`),
	CONSTRAINT `savedSignals_user_source_unique` UNIQUE(`userId`,`signalType`,`sourceId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `savedSignals` ADD CONSTRAINT `savedSignals_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;