const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // Para uploads

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Config Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

// ==========================================
// 1. HERO SECTION (Singleton)
// ==========================================
app.get('/api/homepage/hero', async (req, res) => {
    try {
        let hero = await prisma.heroSection.findUnique({ where: { id: 1 } });
        if (!hero) {
            // Create default if not exists
            hero = await prisma.heroSection.create({
                data: {
                    title: "Bem-vindo",
                    highlight: "Ao Futuro",
                    subtitle: "Sua plataforma de gestão",
                    ctaText: "Saiba Mais",
                    ctaLink: "#"
                }
            });
        }
        res.json(hero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/homepage/hero', async (req, res) => {
    try {
        const hero = await prisma.heroSection.upsert({
            where: { id: 1 },
            update: req.body,
            create: { ...req.body, id: 1 }
        });
        res.json(hero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 2. TIMELINE (CRUD)
// ==========================================
app.get('/api/homepage/timeline', async (req, res) => {
    try {
        const events = await prisma.timelineEvent.findMany({ orderBy: { year: 'desc' } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/homepage/timeline', async (req, res) => {
    try {
        const event = await prisma.timelineEvent.create({ data: req.body });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/homepage/timeline/:id', async (req, res) => {
    try {
        await prisma.timelineEvent.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 3. SERVICES (CRUD)
// ==========================================
app.get('/api/homepage/services', async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/homepage/services', async (req, res) => {
    try {
        const service = await prisma.service.create({ data: req.body });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/homepage/services/:id', async (req, res) => {
    try {
        await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 4. GRUPO PAGE (Singleton)
// ==========================================
app.get('/api/grupo', async (req, res) => {
    try {
        let grupo = await prisma.groupPage.findUnique({ where: { id: 1 } });
        if (!grupo) {
            grupo = await prisma.groupPage.create({
                data: {
                    description: "Descrição do Grupo",
                    vision: "Nossa Visão",
                    mission: "Nossa Missão"
                }
            });
        }
        res.json(grupo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/grupo', async (req, res) => {
    try {
        const grupo = await prisma.groupPage.upsert({
            where: { id: 1 },
            update: req.body,
            create: { ...req.body, id: 1 }
        });
        res.json(grupo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 5. DEPOIMENTOS (CRUD)
// ==========================================
app.get('/api/depoimentos', async (req, res) => {
    try {
        const testimonials = await prisma.testimonial.findMany();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/depoimentos', async (req, res) => {
    try {
        const testimonial = await prisma.testimonial.create({ data: req.body });
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/depoimentos/:id', async (req, res) => {
    try {
        await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 6. CONTACTO (Singleton)
// ==========================================
app.get('/api/contacto', async (req, res) => {
    try {
        let contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });
        if (!contact) {
            contact = await prisma.contactInfo.create({
                data: {
                    email: "contato@exemplo.com",
                    phone: "+55 11 99999-9999",
                    address: "Rua Exemplo, 123",
                    hours: "Seg-Sex, 9h-18h"
                }
            });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/contacto', async (req, res) => {
    try {
        const contact = await prisma.contactInfo.upsert({
            where: { id: 1 },
            update: req.body,
            create: { ...req.body, id: 1 }
        });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 7. HEADER & FOOTER
// ==========================================
// Header
app.get('/api/header', async (req, res) => {
    try {
        let header = await prisma.headerConfig.findUnique({ where: { id: 1 } });
        if (!header) {
            header = await prisma.headerConfig.create({
                data: {
                    logoUrl: "/img/logo.png",
                    logoText: "Logo",
                    backgroundColor: "#ffffff",
                    sticky: true
                }
            });
        }
        res.json(header);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/header', async (req, res) => {
    try {
        const header = await prisma.headerConfig.upsert({
            where: { id: 1 },
            update: req.body,
            create: { ...req.body, id: 1 }
        });
        res.json(header);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Footer
app.get('/api/footer', async (req, res) => {
    try {
        let footer = await prisma.footerConfig.findUnique({ where: { id: 1 } });
        if (!footer) {
            footer = await prisma.footerConfig.create({
                data: {
                    copyright: "© 2024 Todos os direitos reservados",
                    description: "Descrição do rodapé",
                    logoUrl: "/img/logo-footer.png"
                }
            });
        }
        res.json(footer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/footer', async (req, res) => {
    try {
        const footer = await prisma.footerConfig.upsert({
            where: { id: 1 },
            update: req.body,
            create: { ...req.body, id: 1 }
        });
        res.json(footer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// UPLOADS
// ==========================================
app.post('/api/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    // Return the URL to access the file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// ==========================================
// ==========================================
// 8. MIDDLEWARE & AUTH
// ==========================================
// Basic RBAC Middleware
const checkRole = (roles) => {
    return (req, res, next) => {
        const userHeader = req.headers['x-user-role']; // Demo purpose: getting role from header
        if (!userHeader || !roles.includes(userHeader)) {
            return res.status(403).json({ error: "Acesso negado: Permissões insuficientes." });
        }
        next();
    };
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email e senha obrigatórios." });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email já existe." });

        const user = await prisma.user.create({
            data: {
                name: name || "Utilizador",
                email,
                password,
                role: role || "VISITOR"
            }
        });
        res.json({ message: "Conta criada!", user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        // Track activity
        await prisma.activity.create({
            data: { userId: user.id, type: "LOGIN", content: "Utilizador iniciou sessão" }
        });

        res.json({
            token: "mock-jwt-token-" + user.id,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 9. DASHBOARD SPECIALIZED ENDPOINTS
// ==========================================

// VISITOR: Activities
app.get('/api/visitor/activities/:userId', async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            where: { userId: parseInt(req.params.userId) },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PARTNER: Profile
app.get('/api/partner/profile/:userId', async (req, res) => {
    try {
        const profile = await prisma.partnerProfile.findUnique({
            where: { userId: parseInt(req.params.userId) }
        });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// JOBS: List & Apply
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await prisma.jobOpening.findMany({ where: { active: true } });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/jobs/apply', async (req, res) => {
    try {
        const { userId, jobId, resumeUrl } = req.body;
        const app = await prisma.application.create({
            data: { userId, jobId, resumeUrl }
        });
        res.json({ message: "Candidatura enviada!", app });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints ready for integration.`);
});
