import { useState, useMemo } from 'react';
import certificatesData, { categoriesData } from '../data/certificatesData';

export const useCertificates = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCertificates = useMemo(() => {
        return certificatesData.filter(cert => {
            const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
            const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    const categoriesWithCounts = useMemo(() => {
        return categoriesData.map(category => ({
            ...category,
            count: category.id === 'all' 
                ? certificatesData.length 
                : certificatesData.filter(c => c.category === category.id).length
        }));
    }, []);

    return {
        filteredCertificates,
        categoriesWithCounts,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        allCertificates: certificatesData // Provide all certificates for summary stats
    };
};
