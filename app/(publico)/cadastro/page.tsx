import LayoutPublico from "@/app/(publico)/layout";
import { CadastroUsuarioForm } from "@/modules/usuario/components/CadastroUsuarioForm";

export const metadata = {
  title: "Criar conta | Cash Control",
};

export default function CadastroPage() {
  return (
    <LayoutPublico>
      <CadastroUsuarioForm />
    </LayoutPublico>
  );
}
