import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors/BadRequestError';

const pastaFotos = path.resolve(__dirname, '..', '..', 'uploads', 'fotos');

if (!fs.existsSync(pastaFotos)) {
    fs.mkdirSync(pastaFotos, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, pastaFotos);
    },

    filename: (_req, file, cb) => {
        const sufixoUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extensao = path.extname(file.originalname);

        cb(null, `${sufixoUnico}${extensao}`);
    },
});

function fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) {
    const tiposPermitidos = /jpeg|jpg|png|webp/;

    const extensaoValida = tiposPermitidos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeTypeValido = tiposPermitidos.test(file.mimetype);

    if (extensaoValida && mimeTypeValido) {
        return cb(null, true);
    }

    cb(new BadRequestError(
        'Formato de arquivo inválido. Envie uma imagem (jpg, jpeg, png ou webp).'
    ));
}

export const uploadFoto = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export function anexarCaminhoFoto(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    if (req.file) {
        req.body.foto = `/uploads/fotos/${req.file.filename}`;
    }

    next();
}