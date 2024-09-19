import { GoogleGenerativeAI } from "@google/generative-ai";

interface ICreateNutritionService {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateNutritionService {
  async execute({
    name,
    age,
    gender,
    height,
    weight,
    level,
    objective,
  }: ICreateNutritionService) {
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_AI_API_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com nome: ${name} 
        do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, 
        atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, 
        propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, 
        propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e 
        dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo 
        os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo 
        dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      );

      if (response.response && response.response.candidates) {
        const json = response.response.candidates[0]?.content.parts[0]
          ?.text as string;

        const convertJson = json
          ?.replace(/```\w*\n/g, "")
          ?.replace(/\n```/g, "")
          ?.trim();

        return convertJson;
      }
    } catch (error) {
      console.log("Erro no serviço da IA", error);
    }
  }
}

export { CreateNutritionService };
