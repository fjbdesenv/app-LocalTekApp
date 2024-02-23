import { defineComponent } from 'vue';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default defineComponent({
    data: () => ({
        tableName: ''
    }),
    methods: {
        gerarPDF() {
            const doc = new jsPDF();
            const data = new Date();
            data.setUTCHours(-4);
            doc.text(this.tableName.toLocaleUpperCase(), 80, 10);
            autoTable(doc, { html: `#${this.tableName}` });
            doc.save(`${this.tableName}-${data.toISOString()}.pdf`);
        },
    }
});