import { motion } from 'framer-motion';
import { Building2, Shield, Users, CreditCard, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Efficiently manage tenant information, applications, and communications.'
    },
    {
      icon: CreditCard,
      title: 'Payment Tracking',
      description: 'Track rent payments, generate receipts, and manage financial records.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Role-based access control and secure data management for peace of mind.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'PG Owner',
      content: 'StayNest has transformed how I manage my paying guest facility. Everything is organized and automated!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Tenant',
      content: 'Love how easy it is to pay rent and submit service requests. The interface is so intuitive!',
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-6 py-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">StayNest</h1>
              <p className="text-xs text-white/80">PG Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-16"
      >
        <div className="text-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Simplify Your
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                PG Management
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              A comprehensive solution for managing paying guest accommodations with ease. 
              Handle tenants, payments, requests, and more in one beautiful platform.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-glass text-white">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants} className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-glass">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="mt-24 text-center">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-glass">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of PG owners and tenants who trust StayNest for their accommodation management needs.
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated">
                  Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t border-white/20 mt-24"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white/70">
            <p>&copy; 2024 StayNest. All rights reserved.</p>
            <p className="mt-2">Making PG management simple and efficient.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;