import sample_foods from "../Data";

export const getall = async () => sample_foods

export const search = async (searchTerm) => {
    return sample_foods.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  export const getById = async id => {
    return sample_foods.find(item => item.id === id);
  }
  