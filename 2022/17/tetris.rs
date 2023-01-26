// 1000000000

fn main() {
    let mut idx = 0;
    let mut ys: [i32; 100000] = [0; 100000];

    for _n in 1..=100000000 {
        ys[idx] = 0;
        idx = (idx + 1) % (ys.len() - 1);
        ys[idx] = 1;
        
        /*
        for x in ys {
            print!("{x}");
        }
        println!("");
        */
    }
}
