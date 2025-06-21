import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Veiculo } from '../entities';

export default class VeiculoSeeder implements Seeder {

    track = false;

    public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

        const veiculoFactory = factoryManager.get(Veiculo);
    
        await veiculoFactory.saveMany(10);
    }
}
