import {
  // Core UI
  MessageSquare, CheckCircle2, Send,
  // Commerce
  ShoppingCart, ShoppingBag, Store, CreditCard, Receipt, Package,
  // Business
  Building2, Briefcase, Building, Factory, Landmark, TrendingUp, Handshake,
  // Food & Hospitality
  Utensils, Coffee, Wine, ChefHat, Hotel, Bed,
  // Travel
  Plane, Car, Train, Ship, Compass, Map, Luggage,
  // Health
  Stethoscope, Heart, Pill, Activity, Hospital,
  // Education
  GraduationCap, Book, Pencil, School,
  // Tech
  Laptop, Smartphone, Monitor, Cpu, Wifi,
  // Communication
  Phone, Mail, Bell,
  // General
  Star, Users, User, Settings, Home, Zap, Globe,
  // Features
  Clock, BarChart3, ShieldCheck, BookOpen, FileCheck, Bot, FolderOpen, Play, Upload,
  // Additional
  Calendar, Camera, Image, FileText, Folder,
  Shield, Lock, Key, Eye, Download,
  Music, Headphones, Mic, Video,
  Gift, Tag, Bookmark, Award, Trophy,
  Truck, Bike, Bus, Rocket, Anchor,
  ChevronDown, ChevronUp, Loader2, ArrowRight,
  type LucideIcon
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  // Commerce
  ShoppingCart, ShoppingBag, Store, CreditCard, Receipt, Package,
  // Business
  Building2, Briefcase, Building, Factory, Landmark, TrendingUp, Handshake,
  // Food & Hospitality
  Utensils, Coffee, Wine, ChefHat, Hotel, Bed,
  // Travel
  Plane, Car, Train, Ship, Compass, Map, Luggage,
  // Health
  Stethoscope, Heart, Pill, Activity, Hospital,
  // Education
  GraduationCap, Book, Pencil, School,
  // Tech
  Laptop, Smartphone, Monitor, Cpu, Wifi,
  // Communication
  MessageSquare, Phone, Mail, Bell, Send,
  // General
  Star, Users, User, Settings, Home, Zap, Globe,
  // Features
  Clock, BarChart3, ShieldCheck, BookOpen, FileCheck, Bot, FolderOpen, Play, Upload,
  // Additional
  Calendar, Camera, Image, FileText, Folder,
  Shield, Lock, Key, Eye, Download,
  Music, Headphones, Mic, Video,
  Gift, Tag, Bookmark, Award, Trophy,
  Truck, Bike, Bus, Rocket, Anchor,
  CheckCircle2, ChevronDown, ChevronUp, Loader2, ArrowRight
}

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || MessageSquare
}

export {
  MessageSquare, CheckCircle2, Send,
  ShoppingCart, ShoppingBag, Store, CreditCard, Receipt, Package,
  Building2, Briefcase, Building, Factory, Landmark, TrendingUp, Handshake,
  Utensils, Coffee, Wine, ChefHat, Hotel, Bed,
  Plane, Car, Train, Ship, Compass, Map, Luggage,
  Stethoscope, Heart, Pill, Activity, Hospital,
  GraduationCap, Book, Pencil, School,
  Laptop, Smartphone, Monitor, Cpu, Wifi,
  Phone, Mail, Bell,
  Star, Users, User, Settings, Home, Zap, Globe,
  Clock, BarChart3, ShieldCheck, BookOpen, FileCheck, Bot, FolderOpen, Play, Upload,
  Calendar, Camera, Image, FileText, Folder,
  Shield, Lock, Key, Eye, Download,
  Music, Headphones, Mic, Video,
  Gift, Tag, Bookmark, Award, Trophy,
  Truck, Bike, Bus, Rocket, Anchor,
  ChevronDown, ChevronUp, Loader2, ArrowRight
}
