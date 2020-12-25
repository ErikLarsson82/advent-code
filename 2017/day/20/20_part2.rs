// Execute with ./20_part2.exe puzzle_input.txt

use std::env;
use std::fs::File;
use std::io::prelude::*;

#[derive(Debug)]
struct Vector {
    x: i64,
    y: i64,
    z: i64
}

#[derive(Debug)]
struct Particle {
    position: Vector,
    velocity: Vector,
    acceleration: Vector,
    alive: bool,
    flagged: bool
}


fn main() {
    let args: Vec<String> = env::args().collect();

    let filename = &args[1];

    println!("In file {}", filename);

    let mut f = File::open(filename).expect("file read error");

    let mut contents = String::new();

    f.read_to_string(&mut contents).expect("something went wrong reading the file");

    let split = contents.trim().split("\n");

    let vec = split.collect::<Vec<&str>>();

    let mut mapped_vec: Vec<Particle> = vec.iter().map(create_particle).collect();

    let mut counter = 0;

    loop {
        counter += 1;

        //Update position and speed
        for i in 0..mapped_vec.len() {
            update_particle(&mut mapped_vec[i]);
        }

        //Iterate all particles and flag duplicates
        for i in 0..mapped_vec.len() {
            //Compare this particle to all others
            for j in 0..mapped_vec.len() {
                let condition1 = mapped_vec[i].position.x == mapped_vec[j].position.x;
                let condition2 = mapped_vec[i].position.y == mapped_vec[j].position.y;
                let condition3 = mapped_vec[i].position.z == mapped_vec[j].position.z;
                let condition4 = mapped_vec[i].alive == true;
                let condition5 = mapped_vec[j].alive == true;
                let condition6 = i != j;
                if condition1 && condition2 && condition3 && condition4 && condition5 && condition6 {
                    mapped_vec[i].flagged = true;
                    mapped_vec[j].flagged = true;
                }
            }
        }

        //Kill all flagged and reset flag
        for i in 0..mapped_vec.len() {
            if mapped_vec[i].flagged == true {
                mapped_vec[i].alive = false;
                mapped_vec[i].flagged = false;
            }
        }


        //Find particle closest to center this instance
        {
            let mut minimum = 2000000000;
            let mut idx = 2000000000;
            for i in 0..mapped_vec.len() {
                if distance(&mapped_vec[i]) < minimum {
                    minimum = distance(&mapped_vec[i]);
                    idx = i;
                }
            }

            if counter % 1 == 0 {
                //Count all alive particles
                let mut count_alive = 0;
                for i in 0..mapped_vec.len() {
                    if mapped_vec[i].alive == true {
                        count_alive += 1;
                    }
                }
                println!("Minimum distance {}, particle idx {}, alive {}", minimum, idx, count_alive);
            }
        }
    }
}

fn update_particle(particle: &mut Particle) -> &mut Particle {
    particle.velocity.x += particle.acceleration.x;
    particle.velocity.y += particle.acceleration.y;
    particle.velocity.z += particle.acceleration.z;
    particle.position.x += particle.velocity.x;
    particle.position.y += particle.velocity.y;
    particle.position.z += particle.velocity.z;
    particle
}


fn distance(particle: &Particle) -> i64 {
    particle.position.x.abs() + particle.position.y.abs() + particle.position.z.abs()
}


fn create_particle(x: &&str) -> Particle {
    let particle_str: Vec<&str> = x.trim().split(", ").collect();

    let position_string: String = particle_str[0].chars().skip(3).take(particle_str[0].len() - 4).collect();
    let position_vector: Vec<i64> = position_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();

    let velocity_string: String = particle_str[1].chars().skip(3).take(particle_str[1].len() - 4).collect();
    let velocity_vector: Vec<i64> = velocity_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();

    let acceleration_string: String = particle_str[2].chars().skip(3).take(particle_str[2].len() - 4).collect();
    let acceleration_vector: Vec<i64> = acceleration_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();

    Particle {
        position: Vector { x: position_vector[0], y: position_vector[1], z: position_vector[2] },
        velocity: Vector { x: velocity_vector[0], y: velocity_vector[1], z: velocity_vector[2] },
        acceleration: Vector { x: acceleration_vector[0], y: acceleration_vector[1], z: acceleration_vector[2] },
        alive: true,
        flagged: false
    }
}
