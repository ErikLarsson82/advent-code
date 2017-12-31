use std::env;
use std::fs::File;
use std::io::prelude::*;

#[derive(Debug)]
struct Vector {
    x: i32,
    y: i32,
    z: i32
}

#[derive(Debug)]
struct Particle {
    position: Vector,
    velocity: Vector,
    acceleration: Vector
}

fn main() {
    let args: Vec<String> = env::args().collect();

    let query = &args[1];
    let filename = &args[2];

    let test: Particle = Particle {
        position: Vector { x: 0, y: 0, z: 0 },
        velocity: Vector { x: 0, y: 0, z: 0 },
        acceleration: Vector { x: 0, y: 0, z: 0 }
    };

    println!("Test {:?}", test);

    println!("Searching for {}", query);

    println!("In file {}", filename);

    let mut f = File::open(filename).expect("file read error");

    let mut contents = String::new();

    f.read_to_string(&mut contents).expect("something went wrong reading the file");

    let split = contents.split("\n");

    let vec = split.collect::<Vec<&str>>();

    let mapped_vec: Vec<Particle> = vec.iter().map(create_particle).collect();
    
    println!("Vec:\n{:?}", mapped_vec);
}

fn create_particle(x: &&str) -> Particle {
    let particle_str: Vec<&str> = x.split(", ").collect();

    let position_string: String = particle_str[0].chars().skip(3).take(particle_str[0].len() - 4).collect();
    let position_vector: Vec<i32> = position_string.trim().split(",").map(|x| x.parse::<i32>().unwrap()).collect();
    
    println!("position_string {:?}", position_string);
    println!("position_vector {:?}", position_vector);

    Particle {
        position: Vector { x: position_vector[0], y: position_vector[1], z: position_vector[1] },
        velocity: Vector { x: 0, y: 0, z: 0 },
        acceleration: Vector { x: 0, y: 0, z: 0 }
    }
}