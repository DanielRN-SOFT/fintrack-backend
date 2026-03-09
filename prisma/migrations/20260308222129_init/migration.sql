-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(60) NOT NULL,
    `tipo` ENUM('Ingreso', 'Egreso') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usuarios_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_categorias_usuarios1_idx`(`usuarios_id`),
    INDEX `idx_usuario_categoria`(`usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conceptos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `categorias_id` INTEGER NOT NULL,
    `usuarios_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_conceptos_categorias1_idx`(`categorias_id`),
    INDEX `fk_conceptos_usuarios1_idx`(`usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuentas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(75) NOT NULL,
    `tipo` ENUM('Cash', 'Banco', 'Digital') NOT NULL,
    `saldo_inicial` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usuarios_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_cuentas_usuarios1_idx`(`usuarios_id`),
    INDEX `idx_usuario_cuenta`(`usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(75) NOT NULL,
    `monto_objetivo` DECIMAL(10, 2) NOT NULL,
    `monto_actual` DECIMAL(10, 2) NOT NULL,
    `fecha_limite` DATE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usuarios_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_metas_usuarios1_idx`(`usuarios_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` ENUM('Administrador', 'Usuario') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Ingreso', 'Egreso') NOT NULL,
    `fecha` DATE NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `estado` ENUM('Activa', 'Anulada') NULL DEFAULT 'Activa',
    `usuarios_id` INTEGER NOT NULL,
    `cuentas_id` INTEGER NOT NULL,
    `conceptos_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_transacciones_conceptos1_idx`(`conceptos_id`),
    INDEX `fk_transacciones_cuentas1_idx`(`cuentas_id`),
    INDEX `fk_transacciones_usuarios1_idx`(`usuarios_id`),
    INDEX `idx_usuario_fecha`(`usuarios_id`, `fecha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(75) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(20) NULL,
    `token` VARCHAR(255) NULL,
    `confirmado` BOOLEAN NULL DEFAULT false,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `roles_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_usuarios_roles1_idx`(`roles_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `fk_categorias_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conceptos` ADD CONSTRAINT `fk_conceptos_categorias1` FOREIGN KEY (`categorias_id`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conceptos` ADD CONSTRAINT `fk_conceptos_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuentas` ADD CONSTRAINT `fk_cuentas_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `metas` ADD CONSTRAINT `fk_metas_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `fk_transacciones_conceptos1` FOREIGN KEY (`conceptos_id`) REFERENCES `conceptos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `fk_transacciones_cuentas1` FOREIGN KEY (`cuentas_id`) REFERENCES `cuentas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `fk_transacciones_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
